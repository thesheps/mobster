import { shallowMount } from "@vue/test-utils";
import localVueFactory from "./local-vue-factory";
import Timer from "../../src/components/Timer.vue";
import eventBus from "../../src/utils/event-bus";
import store from "../../src/store";

describe("Timer.vue", () => {
  const localVue = localVueFactory.create();

  it("contains the progress component", () => {
    const wrapper = shallowMount(Timer, {
      localVue,
      store
    });

    const progress = wrapper.find("v-progress-circular-stub");
    expect(progress.is("v-progress-circular-stub")).toBe(true);
  });

  it("contains a pause button", () => {
    const wrapper = shallowMount(Timer, {
      localVue,
      store
    });

    const pause = wrapper.find("v-btn-stub");
    expect(pause.is("v-btn-stub")).toBe(true);
    expect(pause.text()).toBe("Start");
  });

  it("starts the timer when you press start", () => {
    const wrapper = shallowMount(Timer, {
      localVue,
      store
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
      localVue,
      store
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
      store,
      propsData: { cycleTime: "00:08:00" }
    });

    wrapper.vm.secondsLeft = 200;
    wrapper.vm.totalSeconds = 480;
    expect(wrapper.vm.ratio).toBe((200 / 480) * 100);
  });

  it("emits a rotate mobster event upon timer completion", () => {
    let eventEmitted = false;
    eventBus.$on("rotateMobster", () => (eventEmitted = true));

    const wrapper = shallowMount(Timer, {
      localVue,
      store,
      propsData: { cycleTime: "00:08:00" }
    });

    wrapper.vm.secondsLeft = 0;
    wrapper.vm.totalSeconds = 0;
    wrapper.vm.rotateMobster();

    expect(eventEmitted).toBeTruthy();
  });

  it("emits a take-a-break event after configured number of rotations", () => {
    let eventEmitted = false;
    eventBus.$on("takeABreak", () => (eventEmitted = true));

    const wrapper = shallowMount(Timer, {
      localVue,
      store
    });

    wrapper.vm.rotateMobster();
    wrapper.vm.rotateMobster();
    wrapper.vm.rotateMobster();
    wrapper.vm.rotateMobster();
    wrapper.vm.rotateMobster();
    wrapper.vm.rotateMobster();
    wrapper.vm.rotateMobster();
    wrapper.vm.rotateMobster();

    expect(eventEmitted).toBeTruthy();
  });
});
