import { mount } from "@vue/test-utils";

import TaskCard from "../index";

// TODO: Improve test coverage
describe("TaskCard.vue", () => {
  it("renders TaskCard component", () => {
    // Prepare
    const task = {};
    const onDeleteTask = jest.fn();
    const toggleTaskEnable = jest.fn();
    const toggleEditModal = jest.fn();
    const markAsCompleted = jest.fn();
    const defaultText = "Enable  Edit Delete";

    // Act
    const taskCard = mount(TaskCard, {
      propsData: {
        task,
        onDeleteTask,
        toggleTaskEnable,
        toggleEditModal,
        markAsCompleted,
      },
    });

    // Assert
    expect(taskCard.text()).toMatch(defaultText);
  });

  it("Should call onDeleteTask when delete button is clicked", () => {
    // Prepare
    const task = {};
    const onDeleteTask = jest.fn();
    const toggleTaskEnable = jest.fn();
    const toggleEditModal = jest.fn();
    const markAsCompleted = jest.fn();
    const defaultText = "Enable  Edit Delete";

    // Act
    const taskCard = mount(TaskCard, {
      propsData: {
        task,
        onDeleteTask,
        toggleTaskEnable,
        toggleEditModal,
        markAsCompleted,
      },
    });
    const deleteButton = taskCard.findAll("button");
    deleteButton.at(2).trigger("click");

    // Assert
    expect(taskCard.text()).toMatch(defaultText);
    expect(onDeleteTask).toHaveBeenCalled();
  });

  it.each([
    {
      isEnabled: true,
      isCompleted: true,
    },
    {
      isEnabled: false,
      isCompleted: true,
    },
    {
      isEnabled: false,
      isCompleted: false,
    },
  ])(
    "Should not show mark as completed for task that is not enabled",
    (task) => {
      const onDeleteTask = jest.fn();
      const toggleTaskEnable = jest.fn();
      const toggleEditModal = jest.fn();
      const markAsCompleted = jest.fn();

      // Act
      const taskCard = mount(TaskCard, {
        propsData: {
          task,
          onDeleteTask,
          toggleTaskEnable,
          toggleEditModal,
          markAsCompleted,
        },
      });
      const allButton = taskCard.findAll("button");

      // Assert
      expect(allButton.length).toBe(3);
    }
  );

  it("Should only show mark as completed for enabled task", () => {
    const task = {
      isEnabled: true,
      isCompleted: false,
    };
    const onDeleteTask = jest.fn();
    const toggleTaskEnable = jest.fn();
    const toggleEditModal = jest.fn();
    const markAsCompleted = jest.fn();

    // Act
    const taskCard = mount(TaskCard, {
      propsData: {
        task,
        onDeleteTask,
        toggleTaskEnable,
        toggleEditModal,
        markAsCompleted,
      },
    });
    const allButton = taskCard.findAll("button");

    // Assert
    expect(allButton.length).toBe(4);
  });

  it.each([
    {
      isEnabled: true,
      isCompleted: false,
    },
    {
      isEnabled: false,
      isCompleted: false,
    },
  ])("Should call toggleDisabled function when disabled/enabled is clicked", (task) => {
    const onDeleteTask = jest.fn();
    const toggleTaskEnable = jest.fn();
    const toggleEditModal = jest.fn();
    const markAsCompleted = jest.fn();

    // Act
    const taskCard = mount(TaskCard, {
      propsData: {
        task,
        onDeleteTask,
        toggleTaskEnable,
        toggleEditModal,
        markAsCompleted,
      },
    });
    const allButton = taskCard.findAll("button");
    allButton.at(0).trigger("click");

    // Assert
    expect(toggleTaskEnable).toHaveBeenCalled();
  });
});
