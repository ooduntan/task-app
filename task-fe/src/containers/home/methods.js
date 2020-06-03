import axios, { get } from "axios";
const { VUE_APP_API_BASE_URL: baseUrl, VUE_APP_API_PORT: port } = process.env
const baseApiURL = `${baseUrl}:${port}/task`

export default {
  async deleteTask(id) {
    const url = `${baseApiURL}/${id}`;
    this.notificationMessage = "";

    try {
      const skip = this.getCurrentPageSkip();
      await axios.delete(url);
      this.fetchTaskList(skip);
    } catch (error) {
      this.notificationMessage = "An error occurred. Please try latter";
      console.log({ error });
    }
  },

  async markAsCompleted(taskId) {
    const task = this.getTaskById(taskId);
    if (!task) {
      return (this.notificationMessage = "Invalid task id");
    }
    task.isCompleted = true;
    const newTaskData = this.excludeTaskTimestamp(task);

    try {
      await this.updateTask(newTaskData);
      const skip = this.getCurrentPageSkip();
      await this.fetchTaskList(skip);
    } catch (error) {
      this.notificationMessage = "An error occurred. Please try latter";
    }
  },

  getCurrentPageSkip() {
    return (this.$route.query.page - 1) * this.take || 0;
  },

  excludeTaskTimestamp({ id, title, description, isCompleted, isEnabled }) {
    return { id, title, description, isCompleted, isEnabled };
  },

  closeNotification() {
    this.notificationMessage = "";
  },

  getTaskById(id) {
    return this.tasks.find(function(task) {
      return task.id === id;
    });
  },

  toggleEditModal(id) {
    this.modalState = !this.modalState;
    this.formGroupError = "";
    if (typeof id !== "number") return; // Closes the modal

    const editingTask = this.getTaskById(id);

    if (!editingTask) {
      return (this.notificationMessage = `Could not find task with id ${id}`);
    }

    const newTaskData = this.excludeTaskTimestamp(editingTask);

    this.form = { ...newTaskData };
  },

  async fetchTaskList(skip, take = 10) {
    const url = `${baseApiURL}?take=${take}&skip=${skip}`;
    this.loading = true;
    this.notificationMessage = "";

    try {
      const {
        data: [tasks, total],
      } = await get(url);
      this.totalTask = total;
      this.tasks = tasks;
      this.loading = false;
    } catch (error) {
      this.notificationMessage = "Error fetching task list";
    }
  },

  async toggleTaskEnable(id) {
    this.notificationMessage = "";
    const task = this.getTaskById(id);

    if (!task) {
      return (this.notificationMessage = "Invalid Task");
    }

    const { title, description, isEnabled, isCompleted } = task;
    const newTask = {
      id,
      title,
      description,
      isEnabled: !isEnabled,
      isCompleted,
    };
    const skip = this.getCurrentPageSkip();
    try {
      await this.updateTask(newTask);
      await this.fetchTaskList(skip);
    } catch (error) {
      this.notificationMessage = "An error occurred. Please try latter";
      console.error({ error });
    }
  },

  updateTask(newTaskData) {
    const { id, ...otherTaskData } = newTaskData;
    const url = `${baseApiURL}/${id}`;
    return axios.patch(url, otherTaskData);
  },

  async validateAndSubmit() {
    this.savingFrom = true;
    this.formGroupError = "";
    const errorMessage =
      "Could not update the task at the moment. Please try again";
    this.$v.$touch();
    if (this.$v.$error) {
      this.savingFrom = false;
      return (this.formGroupError = errorMessage);
    }

    try {
      const skip = this.getCurrentPageSkip();
      await this.updateTask(this.form);
      await this.fetchTaskList(skip);
      this.modalState = false;
    } catch (error) {
      this.formGroupError = errorMessage;
    } finally {
      this.savingFrom = false;
    }
  },
};
