export default {
  name: 'TextField',
  props: {
    errorMessage: String,
    hasError: {
      type: Boolean,
      default: false,
    },
    label: String,
  }
}