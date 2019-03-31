import { shallowMount } from "@vue/test-utils";
import localVueFactory from "./local-vue-factory";
import Timer from "../../src/components/Timer.vue";

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
    wrapper.vm.toggleTimer();
    expect(pause.text()).toBe("Pause");
  });

  it("stops the timer when you press pause", () => {
    const wrapper = shallowMount(Timer, {
      localVue
    });

    const pause = wrapper.find("v-btn-stub");
    expect(pause.is("v-btn-stub")).toBe(true);
    expect(pause.text()).toBe("Start");

    wrapper.vm.toggleTimer();
    wrapper.vm.toggleTimer();
    expect(pause.text()).toBe("Start");
  });

  it("uses the provided cycleTime property to configure the timer", () => {
    const wrapper = shallowMount(Timer, {
      localVue,
      propsData: { cycleTime: "00:08:00" }
    });

    expect(wrapper.vm.secondsLeft).toBe(480);
  });
});
