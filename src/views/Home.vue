<template>
  <v-container fluid>
    <v-layout row>
      <v-flex grow>
        <MobsterList></MobsterList>
      </v-flex>

      <v-flex shrink>
        <Timer></Timer>
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
