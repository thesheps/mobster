import { shallowMount } from "@vue/test-utils";
import localVueFactory from "./local-vue-factory";
import Timer from "../../src/components/Timer.vue";
import Vue from "vue";

describe("Timer.vue", () => {
  const localVue = localVueFactory.create();

  it("contains the progress component", () => {
    const wrapper = shallowMount(Timer, {
      localVue
    });

    const progress = wrapper.find("v-progress-circular-stub");
    expect(progress.is("v-progress-circular-stub")).toBe(true);
  });

  it("contains a pause button", () => {
    const wrapper = shallowMount(Timer, {
      localVue
    });

    const pause = wrapper.find("v-btn-stub");
    expect(pause.is("v-btn-stub")).toBe(true);
    expect(pause.text()).toBe("Start");
  });

  it("starts the timer when you press start", () => {
    const wrapper = shallowMount(Timer, {
      localVue
    });

    const pause = wrapper.find("v-btn-stub");
    expect(pause.is("v-btn-stub")).toBe(true);
    expect(pause.text()).toBe("Start");

    wrapper.vm.timer = jest.fn();
    wrapper.vm.toggleTimer(true);
    expect(pause.text()).toBe("Pause");
  });

  it("stops the timer when you press pause", () => {
    const wrapper = shallowMount(Timer, {
      localVue
    });

    const pause = wrapper.find("v-btn-stub");
    expect(pause.is("v-btn-stub")).toBe(true);
    expect(pause.text()).toBe("Start");

    wrapper.vm.toggleTimer(true);
    wrapper.vm.toggleTimer(false);
    expect(pause.text()).toBe("Start");
  });

  it("sets the ratio of completion correctly", () => {
    const wrapper = shallowMount(Timer, {
      localVue,
      propsData: { cycleTime: "00:08:00" }
    });

    wrapper.vm.secondsLeft = 200;
    wrapper.vm.totalSeconds = 480;
    expect(wrapper.vm.ratio).toBe((200 / 480) * 100);
  });

  it("emits a rotate mobster event upon timer completion", () => {
    const wrapper = shallowMount(Timer, {
      localVue,
      propsData: { cycleTime: "00:08:00" }
    });

    wrapper.vm.secondsLeft = 0;
    wrapper.vm.totalSeconds = 0;
    wrapper.vm.rotateMobster();

    expect(wrapper.emitted().rotateMobster).toBeTruthy();
  });
});
