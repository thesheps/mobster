<template>
  <v-list>
    <v-subheader large>Configuration</v-subheader>

    <v-list-tile>
      <v-text-field
        large
        label="Cycle time"
        v-model="cycleTime"
        mask="##:##:##"
        placeholder="00:08:00"
        return-masked-value
      ></v-text-field>
    </v-list-tile>
  </v-list>
</template>

<script>
export default {
  data() {
    return {
      cycleTime: "00:08:00"
    };
  },

  watch: {
    cycleTime(newValue) {
      this.$emit("input", { cycleTime: newValue });
    }
  },

  created() {
    this.$emit("input", { cycleTime: this.cycleTime });
  }
};
</script>

<style></style>
