<template>
  <v-list>
    <v-subheader class="display-1 mb-4">Configuration</v-subheader>

    <v-list-tile>
      <v-text-field
        class="title"
        label="Cycle time"
        v-model="cycleTime"
        mask="##:##:##"
        placeholder="00:08:00"
        return-masked-value
      ></v-text-field>
    </v-list-tile>

    <v-list-tile class="mt-4">
      <v-text-field
        class="title"
        mask="##"
        label="Break frequency"
        v-model="breakFrequency"
        placeholder="Every N turns..."
      ></v-text-field>
    </v-list-tile>
  </v-list>
</template>

<script>
export default {
  data() {
    return {
      cycleTime: "00:08:00",
      breakFrequency: 4
    };
  },

  watch: {
    cycleTime(newValue) {
      this.$emit("input", {
        cycleTime: newValue,
        breakFrequency: parseInt(this.breakFrequency)
      });
    },

    breakFrequency(newValue) {
      this.$emit("input", {
        cycleTime: this.cycleTime,
        breakFrequency: parseInt(newValue)
      });
    }
  },

  created() {
    this.$emit("input", {
      cycleTime: this.cycleTime,
      breakFrequency: this.breakFrequency
    });
  }
};
</script>