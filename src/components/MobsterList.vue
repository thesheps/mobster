<template>
  <v-container>
    <v-text-field
      v-on:keyup.enter="addMobster"
      v-model="mobsterName"
      placeholder="Add a new Mobster..."
    ></v-text-field>

    <v-list v-if="mobsters.length > 0">
      <draggable v-model="mobsters" handle=".dragger">
        <transition-group type="transition" name="flip-list">
          <v-list-tile v-for="mobster in mobsters" :key="mobster.id" avatar class="dragger" @click>
            <v-list-tile-action>
              <v-icon color="mobster.isDriving ? pink : grey">star</v-icon>
            </v-list-tile-action>

            <v-list-tile-avatar>
              <img :src="mobster.avatar">
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title v-text="mobster.name"></v-list-tile-title>
            </v-list-tile-content>

            <v-list-tile-action>
              <v-btn icon ripple>
                <v-icon color="grey lighten-1">delete</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </transition-group>
      </draggable>
    </v-list>
  </v-container>
</template>

<script>
import avatarService from "../utils/avatar-service.js";
import draggable from "vuedraggable";

export default {
  components: {
    draggable
  },

  data: () => ({
    mobsterName: "",
    mobsters: []
  }),

  methods: {
    async addMobster() {
      let url = await avatarService.getAvatar();

      this.mobsters.push({
        id: this.mobsters.length,
        name: this.mobsterName,
        avatar: url
      });

      this.mobsterName = "";
    }
  }
};
</script>

<style>
.flip-list-move {
  transition: transform 0.5s;
}

.dragger {
  cursor: pointer;
}
</style>
