import { createLocalVue, shallowMount } from "@vue/test-utils";
import App from "../../src/App.vue";
import Vuetify from "vuetify";

describe("App.vue", () => {
  const localVue = createLocalVue();
  localVue.use(Vuetify);

  it("renders props.msg when passed", () => {
    const msg = "Mobster Time";
    const wrapper = shallowMount(App, {
      localVue
    });

    const title = wrapper.find(".headline");

    expect(title.text()).toMatch(msg);
  });
});
