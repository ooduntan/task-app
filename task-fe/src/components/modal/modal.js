export default {
  name: 'Modal',
  props: {
    title: String,
    toggleModal: Function,
    isActive: {
      type: Boolean,
      default: false
    },
    savingChanges: {
      type: Boolean,
      default: false
    }
  }
}