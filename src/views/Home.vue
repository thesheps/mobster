<template>
  <v-container fluid>
    <v-layout row v-if="$vuetify.breakpoint.mdAndUp">
      <v-flex class="mr-4">
        <v-list subheader>
          <Configuration></Configuration>
          <MobsterList v-model="mobsters"></MobsterList>
        </v-list>
      </v-flex>

      <v-flex shrink>
        <Timer :disabled="timerDisabled"></Timer>
      </v-flex>
    </v-layout>

    <v-flex row v-else>
      <v-flex row class="mr-4">
        <v-list subheader>
          <Configuration></Configuration>
          <MobsterList v-model="mobsters"></MobsterList>
        </v-list>
      </v-flex>

      <v-flex row shrink>
        <Timer condensed="true" :disabled="timerDisabled"></Timer>
      </v-flex>
    </v-flex>
  </v-container>
</template>

<script>
import { mapState } from "vuex";

import Timer from "../components/Timer.vue";
import MobsterList from "../components/MobsterList.vue";
import Configuration from "../components/Configuration.vue";

export default {
  components: {
    Configuration,
    Timer,
    MobsterList
  },

  data() {
    return {
      configuration: {},
      mobsters: [],
      timerDisabled: true
    };
  },

  computed: {
    ...mapState({
      cycleTime: state => state.cycleTime,
      breakFrequency: state => state.breakFrequency
    })
  },

  watch: {
    configuration() {
      this.setTimerDisabled();
    },

    mobsters() {
      this.setTimerDisabled();
    }
  },

  methods: {
    setTimerDisabled() {
      this.timerDisabled =
        this.cycleTime == null ||
        this.breakFrequency == null ||
        this.mobsters.length <= 1;
    }
  }
};
</script>
