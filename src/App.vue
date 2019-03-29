<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Mobster</span>
        <span class="font-weight-light">Time</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn
        flat
        icon
        color="pink"
        href="https://campaign.justgiving.com/charity/forevermanchester/bigchangemcr"
      >
        <v-icon>favorite</v-icon>
      </v-btn>
    </v-toolbar>

    <v-content>
      <Timer/>
    </v-content>
  </v-app>
</template>

<script>
import Timer from "./components/Timer";

export default {
  name: "App",
  components: {
    Timer
  },
  data() {
    return {
      //
    };
  }
};
</script>
