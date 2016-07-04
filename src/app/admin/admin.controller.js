(function () {
  'use strict';

  angular
    .module('admin', [
      'schemaForm',
      'ngFileUpload'
    ])
    .controller('AdminController', AdminController);

  /** @ngInject */
  function AdminController(familyMemberRepository, familyMemberInfoRepository, imageRepository) {
    const vm = this;

    vm.dropdownSpouseParent = [];
    vm.form = [
      '*',
      {
        type: 'submit',
        title: 'Save'
      }
    ];
    vm.image = {};
    vm.model = {};
    vm.parent = '';
    vm.schema = {
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
        gender: {
          type: 'string',
          enum: ['male', 'female', 'transgender', 'other']
        },
        dayOfDeath: {
          type: 'string',
          format: 'date'
        },
        order: {
          type: 'number'
        },
        info: {
          type: 'object',
          properties: {
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
        }
      }
    };
    vm.spouse = '';
    vm.submit = submit;

    activate();

    function activate() {
      familyMemberRepository
        .get()
        .then(function (response) {
          vm.dropdownSpouseParent = response
            .filter(function (value) {
              return !value.spouseId;
            })
            .map(function (element) {
              return {id: element.id, label: familyMemberRepository.getNamesAsString(element)}
            });

          return response;
        });
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
