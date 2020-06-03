import { mount } from "@vue/test-utils";

import Modal from "../index";

describe("Modal.vue", () => {
  it("renders Modal component", () => {
    // Prepare
    const spy = jest.fn();
    const label = "Modal";
    const title = "title";
    const toggleModal = spy;
    const isActive = false;
    const savingChanges = false;
    const expectedText = "title  Empty slot Save changes Cancel";

    // Act
    const modal = mount(Modal, {
      propsData: { label, title, toggleModal, isActive, savingChanges },
    });
    const buttons = modal.findAll("button");

    // Assert
    expect(modal.text()).toMatch(expectedText);
    expect(buttons.length).toBe(3);
  });

  it("Should close Modal with close icon", () => {
    // Prepare
    const spy = jest.fn();
    const label = "Modal";
    const title = "title";
    const toggleModal = spy;
    const isActive = false;
    const savingChanges = false;
    const expectedText = "title  Empty slot Save changes Cancel";

    // Act
    const modal = mount(Modal, {
      propsData: { label, title, toggleModal, isActive, savingChanges },
    });
    const buttons = modal.findAll("button");

    // Assert
    expect(modal.text()).toMatch(expectedText);
    expect(buttons.length).toBe(3);
    buttons.at(0).trigger('click');
    expect(spy).toHaveBeenCalled()
  });

  it("Should close Modal with cancel button", () => {
    // Prepare
    const spy = jest.fn();
    const label = "Modal";
    const title = "title";
    const toggleModal = spy;
    const isActive = false;
    const savingChanges = false;
    const expectedText = "title  Empty slot Save changes Cancel";

    // Act
    const modal = mount(Modal, {
      propsData: { label, title, toggleModal, isActive, savingChanges },
    });
    const buttons = modal.findAll("button");

    // Assert
    expect(modal.text()).toMatch(expectedText);
    expect(buttons.length).toBe(3);
    buttons.at(2).trigger('click');
    expect(spy).toHaveBeenCalled()
  });
});
