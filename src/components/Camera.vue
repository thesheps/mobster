<template>
  <v-dialog persistent v-model="show" max-height="400" max-width="400">
    <v-card>
      <v-toolbar>
        <v-btn icon @click="close">
          <v-icon>close</v-icon>
        </v-btn>

        <v-toolbar-title>Say Cheese!!</v-toolbar-title>
      </v-toolbar>

      <video :v-if="show" ref="camera"></video>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" flat @click="snapshot">Snap!</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import webcamUtils from "../utils/webcam-service";
import webcamService from "../utils/webcam-service";

export default {
  props: ["width", "height", "showCamera"],

  data() {
    return {
      show: this.showCamera
    };
  },

  watch: {
    showCamera(newValue) {
      this.show = newValue;

      if (newValue) {
        webcamService.initialise(this.$refs.camera);
      } else {
        webcamService.stop();
        this.close();
      }
    }
  },

  methods: {
    snapshot() {
      const self = this;
      const dataUri = webcamService.takeSnapshot(this.$refs.camera);
      self.$emit("input", dataUri);
      self.$emit("close");
    },

    close() {
      webcamService.stop(this.$refs.camera);
      this.$emit("close");
    }
  }
};
</script>