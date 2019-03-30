import { createLocalVue, shallowMount } from "@vue/test-utils";
import MobsterList from "../../src/components/MobsterList.vue";

import Vuetify from "vuetify";

describe("MobsterList.vue", () => {
  const localVue = createLocalVue();
  localVue.use(Vuetify);

  it("contains a textbox to add a new mobster", () => {
    const wrapper = shallowMount(MobsterList, {
      localVue
    });

    const textbox = wrapper.find("v-text-field-stub");
    expect(textbox.is("v-text-field-stub")).toBe(true);
  });

  it("adds a new mobster to the list when you type and press enter", async () => {
    const wrapper = shallowMount(MobsterList, {
      localVue
    });

    expect(wrapper.vm.mobsters.length).toBe(0);
    wrapper.vm.mobsterName = "Dave";
    await wrapper.vm.addMobster();

    expect(wrapper.vm.mobsters.length).toBe(1);
    expect(wrapper.vm.mobsters[0].name).toBe("Dave");
    expect(wrapper.vm.mobsters[0].avatar).toBe("TEST_URL");
  });
});
