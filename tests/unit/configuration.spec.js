import { shallowMount } from "@vue/test-utils";
import localVueFactory from "./local-vue-factory";
import Configuration from "../../src/components/Configuration.vue";

describe("Configuration.vue", () => {
  const localVue = localVueFactory.create();

  it("renders the subheader correctly", () => {
    const msg = "Configuration";
    const wrapper = shallowMount(Configuration, {
      localVue
    });

    const title = wrapper.find("v-subheader-stub");
    expect(title.text()).toMatch(msg);
  });

  it("has a textbox to configure the cycle time", () => {
    const wrapper = shallowMount(Configuration, {
      localVue
    });

    const textbox = wrapper.find("v-text-field-stub");
    expect(textbox.is("v-text-field-stub")).toBe(true);
  });
});
