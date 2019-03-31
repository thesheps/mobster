<template>
  <v-list>
    <v-subheader large>Configuration</v-subheader>

    <v-list-tile>
      <v-text-field label="Cycle time" v-model="cycleTime" placeholder="00:08:00"></v-text-field>
    </v-list-tile>
  </v-list>
</template>

<script>
export default {
  data() {
    return {
      cycleTime: "00:08:00"
    };
  }
};
</script>

<style></style>
