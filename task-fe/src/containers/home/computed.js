export default {
  disabledTasks() {
    return this.tasks.filter(function(task) {
      return !task.isEnabled && !task.isCompleted;
    });
  },

  enabledTasks() {
    return this.tasks.filter(function(task) {
      return task.isEnabled && !task.isCompleted;
    });
  },

  completedTasks() {
    return this.tasks.filter(function(task) {
      return task.isCompleted;
    });
  },
}