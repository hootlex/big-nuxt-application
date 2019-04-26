const path = require('path');
const templateForm = path.resolve(__dirname, 'TemplateForm.ejs')
const templateButton = path.resolve(__dirname, 'TemplateButton.ejs')
const faker = require('faker');

const NUMBER_OF_PAGES = 20

const randomButtonData = () => {
  const buttonClasses = ['success', 'error', 'warning', 'info']
  return {
    buttonText: `${faker.hacker.verb()} Button`,
    buttonClass: buttonClasses[Math.floor(Math.random() * buttonClasses.length)]
  }
};

module.exports = {
  modules: [
    'resident',
    'neighborhood',
    'admin',
    'building',
    'horse',
    'apartment',
    'firefighter',
    'screencast',
    'doctor',
    'nurse'
  ],
  pages: (() => {
    let words = new Set();
    while (words.size < NUMBER_OF_PAGES) {
      words.add(faker.lorem.word())
    };
    return Array.from(words);
  })(),
  // we need to have 50 per module, add textX for rest pages | 500 page components so far
  components: {
    // 10 per page
    'UserCreateForm': {
      template: templateForm,
      dependencies: {
        'UserCreateFormSaveButton': { template: templateButton, data: randomButtonData },
        'UserCreateFormCancelButton': { template: templateButton, data: randomButtonData },
      }
    },

    'UserUpdateForm': {
      template: templateForm,
      dependencies: {
        'UserUpdateFormSaveButton': { template: templateButton, data: randomButtonData },
        'UserUpdateFormCancelButton': { template: templateButton, data: randomButtonData },
      }
    },

    'DetailsCreateForm': {
      template: templateForm,
      dependencies: {
        'DetailsCreateFormSaveButton': { template: templateButton, data: randomButtonData },
        'DetailsCreateFormCancelButton': { template: templateButton, data: randomButtonData },
        'DetailsCreateFormDismissButton': { template: templateButton, data: randomButtonData },
      }
    }
  }
}
