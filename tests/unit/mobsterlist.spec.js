jest.mock("../../src/utils/notification-service", () => ({
  raiseNotification: jest.fn()
}));

import { shallowMount } from "@vue/test-utils";
import localVueFactory from "./local-vue-factory";
import MobsterList from "../../src/components/MobsterList.vue";
import eventBus from "../../src/utils/event-bus";
import notificationService from "../../src/utils/notification-service";

describe("MobsterList.vue", () => {
  const localVue = localVueFactory.create();

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
    wrapper.vm.mobsterName = "Suzie";
    wrapper.vm.addMobster();

    expect(wrapper.vm.mobsters[0].isDriving).toBe(true);
    expect(wrapper.vm.mobsters[1].isDriving).toBe(false);

    wrapper.vm.setDriver(1);
    expect(wrapper.vm.mobsters[1].isDriving).toBe(true);
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

  it("allows a mobster to be deleted from the list", () => {
    const wrapper = shallowMount(MobsterList, {
      localVue
    });

    expect(wrapper.vm.mobsters.length).toBe(0);
    wrapper.vm.mobsterName = "Dave";
    wrapper.vm.addMobster();

    expect(wrapper.vm.mobsters.length).toBe(1);
    wrapper.vm.removeMobster(0);
    expect(wrapper.vm.mobsters.length).toBe(0);
  });

  it("prevents the user from entering an empty name", () => {
    const wrapper = shallowMount(MobsterList, {
      localVue
    });

    expect(wrapper.vm.mobsters.length).toBe(0);
    wrapper.vm.mobsterName = "";
    wrapper.vm.addMobster();

    expect(wrapper.vm.mobsters.length).toBe(0);
  });

  it("listens for a rotateMobster event and rotates the current driver", () => {
    const wrapper = shallowMount(MobsterList, {
      localVue
    });

    wrapper.vm.mobsterName = "Dave";
    wrapper.vm.addMobster();
    wrapper.vm.mobsterName = "Suzie";
    wrapper.vm.addMobster();

    eventBus.$emit("rotateMobster");

    expect(wrapper.vm.mobsters[0].isDriving).toBe(false);
    expect(wrapper.vm.mobsters[1].isDriving).toBe(true);
    expect(notificationService.raiseNotification).toHaveBeenCalled();
  });
});
