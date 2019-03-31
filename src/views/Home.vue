<template>
  <v-container fluid>
    <v-layout row>
      <v-flex class="mr-4">
        <v-list subheader>
          <Configuration></Configuration>
          <MobsterList></MobsterList>
        </v-list>
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
import Configuration from "../components/Configuration.vue";

export default {
  components: {
    Configuration,
    Timer,
    MobsterList
  }
};
</script>
