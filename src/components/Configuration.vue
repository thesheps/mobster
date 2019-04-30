<template>
  <v-list>
    <v-subheader class="display-1 mb-4">Configuration</v-subheader>

    <v-list-tile>
      <v-text-field
        class="title"
        label="Cycle time"
        mask="##:##:##"
        placeholder="00:08:00"
        return-masked-value
        :value="cycleTime"
        @input="updateCycleTime"
        append-outer-icon="refresh"
        @click:append-outer="updateCycleTime"
      ></v-text-field>
    </v-list-tile>

    <v-list-tile class="mt-4">
      <v-text-field
        class="title"
        mask="##"
        label="Break frequency"
        placeholder="Every N turns..."
        :value="breakFrequency"
        @input="updateBreakFrequency"
      ></v-text-field>
    </v-list-tile>
  </v-list>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      cycleTime: state => state.cycleTime,
      breakFrequency: state => state.breakFrequency
    })
  },

  methods: {
    updateCycleTime(value) {
      this.$store.commit("updateCycleTime", value);
    },

    updateBreakFrequency(value) {
      this.$store.commit("updateBreakFrequency", value);
    }
  }
};
</script>
