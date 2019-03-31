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
          <v-list-tile
            v-for="(mobster, index) in mobsters"
            :key="mobster.id"
            avatar
            class="dragger"
            @click
          >
            <v-list-tile-action @click="setDriver(index)">
              <v-icon :color="mobster.isDriving ? 'pink' : 'grey'">star</v-icon>
            </v-list-tile-action>

            <v-list-tile-avatar @click="toggleAvatar(index)">
              <transition name="fade" mode="out-in">
                <img :key="mobster.avatar" :src="mobster.avatar">
              </transition>
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title v-text="mobster.name"></v-list-tile-title>
            </v-list-tile-content>

            <v-list-tile-action @click="removeMobster(index)">
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
    addMobster() {
      let url = avatarService.getAvatar();

      this.mobsters.push({
        id: this.mobsters.length,
        name: this.mobsterName,
        avatar: url,
        isDriving: false
      });

      this.mobsterName = "";
    },

    setDriver(index) {
      this.mobsters.forEach((m, i) => {
        m.isDriving = false;
        this.$set(this.mobsters, i, m);
      });

      let mobster = this.mobsters[index];
      mobster.isDriving = !mobster.isDriving;
      this.$set(this.mobsters, index, mobster);
    },

    toggleAvatar(index) {
      let mobster = this.mobsters[index];
      let avatar = avatarService.getAvatar();
      while (avatar === mobster.avatar) {
        avatar = avatarService.getAvatar();
      }

      mobster.avatar = avatar;

      this.$set(this.mobsters, index, mobster);
    },

    removeMobster(index) {
      this.$delete(this.mobsters, index);
    }
  }
};
</script>

<style>
.flip-list-move {
  transition: transform 0.5s;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.dragger {
  cursor: pointer;
}
</style>
