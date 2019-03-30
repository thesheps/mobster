import { createLocalVue, shallowMount } from "@vue/test-utils";
import Timer from "../../src/views/Timer.vue";
import MobsterList from "../../src/components/MobsterList.vue";

describe("Timer.vue", () => {
  const localVue = createLocalVue();

  it("contains the mobster list", () => {
    const wrapper = shallowMount(Timer, {
      localVue
    });

    expect(wrapper.contains(MobsterList)).toBe(true);
  });
});
