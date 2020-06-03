export default {
  name: "TaskCard",
  props: {
    task: {
      id: Number,
      title: String,
      isCompleted: Boolean,
      isEnabled: Boolean,
    },
    onDeleteTask: Function,
    toggleTaskEnable: Function,
    toggleEditModal: Function,
    markAsCompleted: Function,
  },
};
