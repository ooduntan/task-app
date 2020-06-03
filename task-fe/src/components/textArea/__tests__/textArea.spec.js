import { mount } from "@vue/test-utils";

import TextArea from "../index";

describe("TextArea.vue", () => {
  it("renders TextArea component", () => {
    // Prepare
    const label = "message";
    const errorMessage = "error";
    const hasError = false;

    // Act
    const textArea = mount(TextArea, {
      propsData: { label, errorMessage, hasError },
    });
    const textarea = textArea.findAll("textarea");
    const error = textArea.findAll(".is-danger");

    // Assert
    expect(textArea.text()).toMatch(label);
    expect(textarea.length).toBe(1)
    expect(error.length).toBe(0)
  });

  it("Should have error class if hasError is true", () => {
    // Prepare
    const label = "message";
    const errorMessage = "error";
    const hasError = true;

    // Act
    const textArea = mount(TextArea, {
      propsData: { label, errorMessage, hasError },
    });
    const textarea = textArea.findAll("textarea");
    const error = textArea.findAll(".is-danger");

    // Assert
    expect(textArea.text()).toMatch(label);
    expect(textarea.length).toBe(1)
    expect(error.length).toBe(2)
  });
});
