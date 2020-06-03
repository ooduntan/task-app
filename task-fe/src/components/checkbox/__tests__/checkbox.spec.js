import { mount } from "@vue/test-utils";
import CheckBox from "../index";

describe("CheckBox.vue", () => {
  it("renders props.label when passed", () => {
    // Prepare
    const label = "CheckBox";

    // Act
    const checkbox = mount(CheckBox, {
      propsData: { label },
    });

    // Assert
    expect(checkbox.text()).toMatch(label);
  });

  it("Should change model when clicked", async () => {
    // Prepare
    const checked = true;
    const label = "CheckBox";
    const checkbox = mount(CheckBox, {
      propsData: { checked, label },
    });

    // Act
    const wrapper = checkbox.findAll('input[type="checkbox"]')
    await wrapper.setChecked(checked);

    // Assert
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.at(0).element.checked).toBe(checked); 
  });
});
