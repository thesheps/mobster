import { shallowMount } from "@vue/test-utils";
import localVueFactory from "./local-vue-factory";
import Configuration from "../../src/components/Configuration.vue";

describe("Configuration.vue", () => {
  const localVue = localVueFactory.create();

  it("renders msg correctly", () => {
    const msg = "Configuration";
    const wrapper = shallowMount(Configuration, {
      localVue
    });

    const title = wrapper.find("v-subheader-stub");

    expect(title.text()).toMatch(msg);
  });
});
