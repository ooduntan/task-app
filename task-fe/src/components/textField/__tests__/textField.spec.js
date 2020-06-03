import { mount } from "@vue/test-utils";

import TextField from "../index";

describe("TextField.vue", () => {
  it("renders TextField component", () => {
    // Prepare
    const label = "message";
    const errorMessage = "error";
    const hasError = false;

    // Act
    const textField = mount(TextField, {
      propsData: { label, errorMessage, hasError },
    });
    const input = textField.findAll("input");
    const error = textField.findAll(".is-danger");

    // Assert
    expect(textField.text()).toMatch(label);
    expect(input.length).toBe(1)
    expect(error.length).toBe(0)
  });

  it("Should have error class if hasError is true", () => {
    // Prepare
    const label = "message";
    const errorMessage = "error";
    const hasError = true;

    // Act
    const textField = mount(TextField, {
      propsData: { label, errorMessage, hasError },
    });
    const input = textField.findAll("input");
    const error = textField.findAll(".is-danger");

    // Assert
    expect(textField.text()).toMatch(label);
    expect(input.length).toBe(1)
    expect(error.length).toBe(2)
  });
});
