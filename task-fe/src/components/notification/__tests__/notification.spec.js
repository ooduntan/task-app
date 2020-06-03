import { mount } from "@vue/test-utils";

import Notification from "../index";

describe("Notification.vue", () => {
  it("renders Notification component", () => {
    // Prepare
    const spy = jest.fn();
    const message = "message";
    const closeNotification = spy;

    // Act
    const notification = mount(Notification, {
      propsData: { message, closeNotification },
    });
    const buttons = notification.findAll("button");

    // Assert
    expect(notification.text()).toMatch(message);
    expect(buttons.length).toBe(1);
  });

  it("Should call closeNotification when close button is clicked", () => {
    // Prepare
    const spy = jest.fn();
    const message = "message";
    const closeNotification = spy;

    // Act
    const notification = mount(Notification, {
      propsData: { message, closeNotification },
    });
    const buttons = notification.findAll("button");
    buttons.trigger("click")

    // Assert
    expect(notification.text()).toMatch(message);
    expect(buttons.length).toBe(1);
    expect(spy).toHaveBeenCalled();
  });

});
