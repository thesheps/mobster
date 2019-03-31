<template>
  <v-container fluid>
    <v-layout row pb-2>
      <v-progress-circular
        v-if="$vuetify.breakpoint.smAndUp"
        :size="size"
        width="125"
        :value="ratio"
        rotate="-90"
      >
        <v-card-text class="display-3">{{ timeElapsed | duration }}</v-card-text>
      </v-progress-circular>
    </v-layout>

    <v-layout row>
      <v-btn block large>Pause</v-btn>
    </v-layout>
  </v-container>
</template>

<script>
import moment from "moment";

export default {
  data: () => ({
    timeElapsed: "08:00",
    ratio: 0,
    size: 450
  }),

  filters: {
    duration: function(value) {
      let duration = moment.duration(value);
      let minutes = ("0" + duration.minutes()).slice(-2);
      let seconds = ("0" + duration.seconds()).slice(-2);

      return `${minutes}:${seconds}`;
    }
  },

  created() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },

  methods: {
    handleResize() {
      let maxWidth = window.innerWidth / 2;
      let maxHeight = window.innerHeight - 200;

      this.size = maxHeight < maxWidth ? maxHeight : maxWidth;
    }
  }
};
</script>

<style></style>
