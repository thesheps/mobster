import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    breakFrequency: 8,
    cycleTime: "00:00:00"
  },

  getters: {
    breakFrequency: state => {
      return state.breakFrequency;
    },

    cycleTime: state => {
      return state.cycleTime;
    }
  },

  mutations: {
    updateBreakFrequency(state, breakFrequency) {
      state.breakFrequency = breakFrequency;
    },

    updateCycleTime(state, cycleTime) {
      state.cycleTime = cycleTime;
    }
  }
});
