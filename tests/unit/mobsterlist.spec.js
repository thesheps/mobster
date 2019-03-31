import { createLocalVue, shallowMount } from "@vue/test-utils";
import MobsterList from "../../src/components/MobsterList.vue";
import Vuetify from "vuetify";
import Vue from "vue";

describe("MobsterList.vue", () => {
  const localVue = createLocalVue();
  Vue.use(Vuetify);

  it("contains a textbox to add a new mobster", () => {
    const wrapper = shallowMount(MobsterList, {
      localVue
    });

    const textbox = wrapper.find("v-text-field-stub");
    expect(textbox.is("v-text-field-stub")).toBe(true);
  });

  it("adds a new mobster to the list when you type and press enter", () => {
    const wrapper = shallowMount(MobsterList, {
      localVue
    });

    expect(wrapper.vm.mobsters.length).toBe(0);
    wrapper.vm.mobsterName = "Dave";
    wrapper.vm.addMobster();

    expect(wrapper.vm.mobsters.length).toBe(1);
    expect(wrapper.vm.mobsters[0].name).toBe("Dave");
    expect(wrapper.vm.mobsters[0].avatar).toContain("img/avatars/");
  });

  it("allows a mobster to be selected as a driver", () => {
    const wrapper = shallowMount(MobsterList, {
      localVue
    });

    expect(wrapper.vm.mobsters.length).toBe(0);
    wrapper.vm.mobsterName = "Dave";
    wrapper.vm.addMobster();

    expect(wrapper.vm.mobsters[0].isDriving).toBe(false);
    wrapper.vm.setDriver(0);
    expect(wrapper.vm.mobsters[0].isDriving).toBe(true);
  });

  it("allows a mobster's avatar to be toggled", () => {
    const wrapper = shallowMount(MobsterList, {
      localVue
    });

    expect(wrapper.vm.mobsters.length).toBe(0);
    wrapper.vm.mobsterName = "Dave";
    wrapper.vm.addMobster();

    let avatar = wrapper.vm.mobsters[0].avatar;
    wrapper.vm.toggleAvatar(0);

    expect(avatar).not.toBe(wrapper.vm.mobsters[0].avatar);
  });
});
