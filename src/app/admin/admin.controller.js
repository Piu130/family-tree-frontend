(function () {
  'use strict';

  angular
    .module('admin', [
      'schemaForm',
      'ngFileUpload'
    ])
    .controller('AdminController', AdminController);

  /** @ngInject */
  function AdminController(familyMemberRepository, familyMemberInfoRepository, familyMemberObject, imageRepository) {
    const vm = this;

    vm.allFamilyMembers = [];
    vm.currentPerson = {};
    vm.dropdownSpouseParent = [];
    vm.editChange = editChange;
    vm.formInfo = [
      '*',
      {
        type: 'submit',
        title: 'Save'
      }
    ];
    vm.formMain = [
      '*',
      {
        type: 'submit',
        title: 'Save'
      }
    ];
    vm.image = null;
    vm.modelInfo = {};
    vm.modelMain = {};
    vm.parent = '';
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
    vm.spouse = '';
    vm.submitInfo = submitInfo;
    vm.submitMain = submitMain;

    activate();

    function activate() {
      familyMemberRepository
        .query()
        .$promise
        .then(function (response) {
          vm.allFamilyMembers = response
            .map(function (familyMember) {
              return {id: familyMember.id, label: familyMemberObject.getNamesAsString(familyMember)}
            });
          vm.dropdownSpouseParent = response
            .filter(function (familyMember) {
              return !familyMember.spouseId;
            })
            .map(function (familyMember) {
              return {id: familyMember.id, label: familyMemberObject.getNamesAsString(familyMember)}
            });

          return response;
        });
    }

    function editChange() {
      familyMemberRepository
        .get({ familyMemberId: vm.currentPerson.id })
        .$promise
        .then(function(response) {
          console.log(response);
          vm.modelMain = response;
        });

      familyMemberRepository
        .getInfo({familyMemberId: vm.currentPerson.id})
        .$promise
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
        .update(vm.modelMain);

      if(vm.image) {
        imageRepository
          .uploadProfilePicture(vm.image, vm.currentPerson);
      }
    }

    function submitInfo() {
      vm.modelInfo.familyMemberId = vm.currentPerson.id;
      familyMemberInfoRepository
        .update(vm.modelInfo);
    }

  }

})();
