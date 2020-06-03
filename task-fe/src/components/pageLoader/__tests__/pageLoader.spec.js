import { mount } from "@vue/test-utils";

import PageLoader from "../index";

describe("PageLoader.vue", () => {
  it("renders PageLoader component", () => {
    // Prepare
    const isActive = true;

    // Act
    const pageLoader = mount(PageLoader, {
      propsData: { isActive },
    });
    const title = pageLoader.findAll(".is-active");

    // Assert
    expect(pageLoader.text()).toMatch('Pageloader');
    expect(title.length).toBe(1);
  });

  it("Should not render PageLoader when isActive is false", () => {
    // Prepare
    const isActive = false;

    // Act
    const pageLoader = mount(PageLoader, {
      propsData: { isActive },
    });
    const title = pageLoader.findAll(".is-active");

    // Assert
    expect(pageLoader.text()).toMatch('Pageloader');
    expect(title.length).toBe(0);
  });

});
