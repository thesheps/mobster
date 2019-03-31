import { createLocalVue, shallowMount } from "@vue/test-utils";
import Timer from "../../src/components/Timer.vue";
import Vuetify from "vuetify";
import Vue from "vue";

describe("Timer.vue", () => {
  const localVue = createLocalVue();
  Vue.use(Vuetify);

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
    expect(pause.text()).toBe("Pause");
  });
});
