export default {
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
  pages: ['create', 'update', 'index', '_id'], // we need to have 50 per module, add textX for rest pages | 500 page components so far
  components: [
    // 10 per page
    'UserCreateForm',
    'UserCreateFormSaveButton',
    'UserCreateFormCancelButton',
    'UserUpdateForm',
    'UserUpdateFormSaveButton',
    'UserUpdateFormCancelButton',
    'DetailsCreateForm',
    'DetailsCreateFormSaveButton',
    'DetailsCreateFormCancelButton',
    'DetailsCreateFormDismissButton'
  ]
}
