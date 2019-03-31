<template>
  <v-container fluid>
    <v-layout row>
      <v-flex class="mr-4">
        <v-list subheader>
          <Configuration v-model="configuration"></Configuration>
          <MobsterList v-model="mobsters"></MobsterList>
        </v-list>
      </v-flex>

      <v-flex shrink>
        <Timer :disabled="timerDisabled" :cycleTime="configuration.cycleTime"></Timer>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
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
        this.configuration.cycleTime == null ||
        this.configuration.breakFrequency == null ||
        this.mobsters.length <= 1;
    }
  }
};
</script>
