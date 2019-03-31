import { createLocalVue } from "@vue/test-utils";
import Vuetify from "vuetify";
import VueRouter from "vue-router";
import { isRegExp } from "util";

const getInstance = () => {
  const localVue = createLocalVue();
  localVue.use(Vuetify);
  localVue.use(VueRouter);

  return localVue;
};

export default {
  create() {
    if (!console) {
      return getInstance();
    }

    const originalLogError = console.error;

    console.error = (...args) => {
      if (
        args[0].includes("[Vuetify]") &&
        args[0].includes("https://github.com/vuetifyjs/vuetify/issues/4068")
      )
        return;
      this.originalLogError(...args);
    };

    const localVue = getInstance();
    console.error = originalLogError;

    return localVue;
  }
};
