(function () {
  'use strict';

  angular
    .module('admin', [
      'schemaForm',
      'ngFileUpload'
    ])
    .controller('AdminController', AdminController);

  /** @ngInject */
  function AdminController(familyMemberRepository, imageRepository) {
    const vm = this;

    vm.dropdownSpouseParent = [];
    vm.allFamilyMembers = [];
    vm.currentPerson = {};
    vm.schemaMain = {
      type: 'object',
      properties: {
        firstNames: {
          type: 'array',
          items: {
            type: 'string'
          }
        },
        lastNames: {
          type: 'array',
          items: {
            type: 'string'
          }
        },
        dayOfDeath: {
          type: 'string',
          format: 'date'
        },
        order: {
          type: 'number'
        },
        public: {
          type: 'boolean'
        }
      }
    };
    vm.schemaInfo = {
      type: 'object',
      properties: {
        gender: {
          type: 'string',
          enum: ['male', 'female', 'transgender', 'other']
        },
        birthday: {
          type: 'string',
          format: 'date'
        },
        size: {
          type: 'number'
        },
        apprenticeships: {
          type: 'array',
          items: {
            type: 'string'
          }
        },
        studies: {
          type: 'array',
          items: {
            type: 'string'
          }
        },
        professions: {
          type: 'array',
          items: {
            type: 'string'
          }
        },
        hobbies: {
          type: 'array',
          items: {
            type: 'string'
          }
        },
        favouriteColor: {
          type: 'string'
        },
        childhoodDream: {
          type: 'string'
        }
      }
    };
    vm.formMain = [
      '*',
      {
        type: 'submit',
        title: 'Save'
      }
    ];
    vm.formInfo = [
      '*',
      {
        type: 'submit',
        title: 'Save'
      }
    ];
    vm.modelMain = {};
    vm.modelInfo = {};

    vm.form = [
      '*',
      {
        type: 'submit',
        title: 'Save'
      }
    ];
    vm.image = null;
    vm.model = {};
    vm.parent = '';
    vm.editChange = editChange;
    vm.spouse = '';
    vm.submit = submit;
    vm.submitMain = submitMain;
    vm.submitInfo = submitInfo;

    activate();

    function activate() {
      familyMemberRepository
        .get()
        .then(function (response) {
          vm.allFamilyMembers = response
            .map(function (familyMember) {
              return {id: familyMember.id, label: familyMemberRepository.getNamesAsString(familyMember)}
            });
          vm.dropdownSpouseParent = response
            .filter(function (familyMember) {
              return !familyMember.spouseId;
            })
            .map(function (familyMember) {
              return {id: familyMember.id, label: familyMemberRepository.getNamesAsString(familyMember)}
            });

          return response;
        });
    }

    function editChange() {
      familyMemberRepository
        .query(vm.currentPerson.id)
        .then(function(response) {
          vm.modelMain = response;
        });

      familyMemberRepository
        .getInfo(vm.currentPerson.id)
        .then(function(response) {
          vm.modelInfo = response;
        });
    }

    function submitMain() {
      if (vm.spouse.id) {
        vm.modelMain.spouseId = vm.spouse.id
      }
      if (vm.parent.id) {
        vm.modelMain.parentId = vm.parent.id
      }

      familyMemberRepository
        .put(vm.modelMain);

      if(vm.image) {
        imageRepository
          .uploadProfilePicture(vm.image, vm.currentPerson);
      }
    }

    function submitInfo() {
      familyMemberRepository
        .setInfo(vm.currentPerson.id, vm.modelInfo);
    }

    function submit() {
      if (vm.spouse.id) {
        vm.model.spouseId = vm.spouse.id
      }
      if (vm.parent.id) {
        vm.model.parentId = vm.parent.id
      }

      const info = vm.model.info;
      delete vm.model.info;

      familyMemberRepository
        .post(vm.model)
        .then(function (response) {

          familyMemberRepository
            .setInfo(response.data.id, info);

          imageRepository
            .uploadProfilePicture(vm.image, response.data);
        });
    }

  }

})();
