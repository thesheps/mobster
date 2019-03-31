<template>
  <v-container fluid>
    <v-layout row>
      <v-flex grow>
        <MobsterList></MobsterList>
      </v-flex>

      <v-flex shrink>
        <Timer cycleTime="00:08:00"></Timer>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Timer from "../components/Timer.vue";
import MobsterList from "../components/MobsterList.vue";

export default {
  components: {
    Timer,
    MobsterList
  }
};
</script>
