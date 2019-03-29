import { shallowMount } from "@vue/test-utils";
import Timer from "../../src/components/Timer.vue";

describe("Timer.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "Mobsters";
    const wrapper = shallowMount(Timer, {
      propsData: { msg },
      stubs: ["v-container", "v-layout"]
    });

    expect(wrapper.text()).toMatch(msg);
  });
});
