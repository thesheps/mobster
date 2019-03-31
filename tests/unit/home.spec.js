import { shallowMount } from "@vue/test-utils";
import localVueFactory from "./local-vue-factory";
import Home from "../../src/views/Home.vue";
import MobsterList from "../../src/components/MobsterList.vue";
import Timer from "../../src/components/Timer.vue";

describe("Home.vue", () => {
  const localVue = localVueFactory.create();

  it("contains the mobster list", () => {
    const wrapper = shallowMount(Home, {
      localVue
    });

    expect(wrapper.contains(MobsterList)).toBe(true);
  });

  it("contains the timer", () => {
    const wrapper = shallowMount(Home, {
      localVue
    });

    expect(wrapper.contains(Timer)).toBe(true);
  });
});
