export default {
  name: 'TextArea',
  props: {
    label: {
      type: String,
    },
    errorMessage: {
      type: String,
    },
    hasError: {
      type: Boolean,
      default: false,
    }
  }
}