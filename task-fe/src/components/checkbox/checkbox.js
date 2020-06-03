export default {
  name: 'CheckBox',
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    label: String,
    checked: Boolean
  }
}