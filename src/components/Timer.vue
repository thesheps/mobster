<template>
  <v-responsive>
    <v-layout row pb-2 v-on:keyup.enter="thing">
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
        @click="toggleTimer(!isRunning)"
        :color="isRunning ? 'error' : 'success'"
        :disabled="disabled"
      >{{ buttonLabel }}</v-btn>
    </v-layout>
  </v-responsive>
</template>

<script>
import moment from "moment";
import { Stopwatch } from "stopwatch";
import eventBus from "../utils/event-bus";

export default {
  props: ["cycleTime", "disabled"],

  data: () => ({
    size: 450,
    width: 125,
    isRunning: false,
    stopwatch: { stop() {} },
    buttonLabel: "Start",
    secondsLeft: 0,
    totalSeconds: 0
  }),

  watch: {
    cycleTime(newValue) {
      this.secondsLeft = new moment.duration(newValue).asSeconds();
      this.totalSeconds = this.secondsLeft;
      this.toggleTimer(false);
    },

    isRunning(newValue) {
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
    this.$notification.requestPermission();
    this.handleResize();
  },

  methods: {
    thing() {
      console.log("FUCK");
    },

    toggleTimer(isRunning) {
      this.isRunning = isRunning;

      if (this.isRunning) {
        let self = this;
        this.stopwatch = new Stopwatch(1, { seconds: this.totalSeconds });

        this.stopwatch.on("tick", function(secondsLeft) {
          self.secondsLeft = secondsLeft;
        });

        this.stopwatch.on("end", function() {
          self.rotateMobster();
        });

        this.stopwatch.start();
      } else {
        this.stopwatch.stop();
      }
    },

    rotateMobster() {
      this.toggleTimer(false);
      eventBus.$emit("rotateMobster");
      this.toggleTimer(true);
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
