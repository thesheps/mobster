<template>
  <v-app :dark="dark">
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Mobster</span>
        <span v-if="$vuetify.breakpoint.mdAndUp" class="font-weight-light">: The collaboration timer</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn flat icon @click="dark = !dark">
        <v-icon>invert_colors</v-icon>
      </v-btn>

      <v-btn flat icon href="https://github.com/thesheps/mobster">
        <v-icon>code</v-icon>
      </v-btn>

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
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "Mobster-Time",
  data() {
    return {
      dark: true
    };
  }
};
</script>
