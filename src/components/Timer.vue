<template>
  <v-responsive>
    <v-layout row pb-2>
      <v-progress-circular
        v-if="$vuetify.breakpoint.smAndUp"
        :size="size"
        :width="width"
        :value="ratio"
        rotate="-90"
      >
        <v-card-text class="display-4">{{ secondsLeft | timeRemaining }}</v-card-text>
      </v-progress-circular>
    </v-layout>

    <v-layout row>
      <v-btn
        block
        large
        @click="toggleTimer"
        :color="isRunning ? 'error' : 'success'"
      >{{ buttonLabel }}</v-btn>
    </v-layout>
  </v-responsive>
</template>

<script>
import moment from "moment";
import { Stopwatch } from "stopwatch";

export default {
  props: ["cycleTime"],

  data: () => ({
    size: 450,
    width: 125,
    isRunning: false,
    stopwatch: {},
    buttonLabel: "Start",
    secondsLeft: 0,
    totalSeconds: 0
  }),

  watch: {
    isRunning: function(newValue) {
      this.buttonLabel = newValue ? "Pause" : "Start";
    }
  },

  computed: {
    ratio() {
      return (this.secondsLeft / this.totalSeconds) * 100;
    }
  },

  filters: {
    timeRemaining: function(secondsLeft) {
      let duration = new moment.duration({ seconds: secondsLeft });
      let hours = ("0" + duration.hours()).slice(-2);
      let minutes = ("0" + duration.minutes()).slice(-2);
      let seconds = ("0" + duration.seconds()).slice(-2);

      return `${hours}:${minutes}:${seconds}`;
    }
  },

  created() {
    window.addEventListener("resize", this.handleResize);
    this.secondsLeft = new moment.duration(this.cycleTime).asSeconds();
    this.totalSeconds = this.secondsLeft;
    this.handleResize();
  },

  methods: {
    toggleTimer() {
      this.isRunning = !this.isRunning;

      if (this.isRunning) {
        let self = this;
        this.stopwatch = new Stopwatch(1, { seconds: this.secondsLeft });

        this.stopwatch.on("tick", function(secondsLeft) {
          self.secondsLeft = secondsLeft;
        });

        this.stopwatch.on("end", function() {
          //when the time ends
        });

        this.stopwatch.start();
      }
    },

    handleResize() {
      let maxWidth = window.innerWidth / 2;
      let maxHeight = window.innerHeight - 200;

      this.size = maxHeight < maxWidth ? maxHeight : maxWidth;
      this.width = (30 / 450) * this.size;
    }
  }
};
</script>

<style></style>
