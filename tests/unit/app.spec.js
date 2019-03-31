import { createLocalVue, shallowMount } from "@vue/test-utils";
import App from "../../src/App.vue";
import Vuetify from "vuetify";
import VueRouter from "vue-router";

describe("App.vue", () => {
  const localVue = createLocalVue();
  localVue.use(Vuetify);
  localVue.use(VueRouter);

  it("renders msg correctly", () => {
    const msg = "mobster";
    const wrapper = shallowMount(App, {
      localVue
    });

    const title = wrapper.find(".headline");

    expect(title.text()).toMatch(msg);
  });
});
