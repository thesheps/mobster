import { shallowMount } from "@vue/test-utils";
import Timer from "@/components/Timer.vue";

describe("Timer.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(Timer, {
      propsData: { msg }
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
