import { createLocalVue, shallowMount } from "@vue/test-utils";
import MobsterList from "../../src/components/MobsterList.vue";

import Vuetify from "vuetify";

describe("MobsterList.vue", () => {
  const localVue = createLocalVue();
  localVue.use(Vuetify);

  it("contains a list of all the mobsters", () => {
    const wrapper = shallowMount(MobsterList, {
      localVue
    });

    const list = wrapper.find("v-list-stub");
    expect(list.is("v-list-stub")).toBe(true);
  });

  it("contains a textbox to add a new mobster", () => {
    const wrapper = shallowMount(MobsterList, {
      localVue
    });

    const textbox = wrapper.find("v-text-field-stub");
    expect(textbox.is("v-text-field-stub")).toBe(true);
  });
});
