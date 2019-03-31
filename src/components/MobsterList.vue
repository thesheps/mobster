<template>
  <v-list>
    <v-subheader large>Mobbers</v-subheader>

    <v-list-tile>
      <v-text-field
        v-on:keyup.enter="addMobster"
        v-model="mobsterName"
        placeholder="Add a new Mobster..."
        autofocus
        label="Mobster name"
      ></v-text-field>
    </v-list-tile>

    <draggable v-model="mobsters" handle=".dragger">
      <transition-group type="transition" name="flip-fade">
        <v-list-tile
          v-for="(mobster, index) in mobsters"
          :key="mobster.id"
          avatar
          class="dragger"
          @click
        >
          <v-list-tile-action @click="setDriver(index)">
            <v-icon :color="mobster.isDriving ? 'pink' : 'grey'">drive_eta</v-icon>
          </v-list-tile-action>

          <v-list-tile-avatar @click="toggleAvatar(index)">
            <transition name="flip-fade" mode="out-in">
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

    <v-snackbar v-model="showError" top>
      {{ errorText }}
      <v-btn color="pink" flat @click="showError = false">Close</v-btn>
    </v-snackbar>
  </v-list>
</template>

<script>
import avatarService from "../utils/avatar-service.js";
import draggable from "vuedraggable";
import eventBus from "../../src/utils/event-bus";

export default {
  components: {
    draggable
  },

  data: () => ({
    mobsterName: "",
    mobsters: [],
    errorText: "",
    showError: false,
    currentDriver: 0
  }),

  watch: {
    currentDriver(index) {
      this.mobsters.forEach((m, i) => {
        m.isDriving = false;
        this.$set(this.mobsters, i, m);
      });

      let mobster = this.mobsters[index];
      if (!mobster) return;

      mobster.isDriving = !mobster.isDriving;
      this.$set(this.mobsters, index, mobster);
    }
  },

  mounted() {
    const self = this;

    eventBus.$on("rotateMobster", () => {
      if (self.currentDriver === self.mobsters.length - 1) {
        self.currentDriver = 0;
      } else {
        self.currentDriver++;
      }
    });
  },

  methods: {
    addMobster() {
      if (!this.mobsterName) {
        this.errorText = "Please enter a mobster name!";
        this.showError = true;
        return;
      }

      let url = avatarService.getAvatar();

      this.mobsters.push({
        id: this.mobsters.length,
        name: this.mobsterName,
        avatar: url,
        isDriving: this.mobsters.length == 0 ? true : false
      });

      this.mobsterName = "";
      this.$emit("input", this.mobsters);
    },

    removeMobster(index) {
      this.$delete(this.mobsters, index);
      this.$emit("input", this.mobsters);
    },

    setDriver(index) {
      this.$notification.show(
        "Time to rotate!",
        {
          body: `${this.mobsters[this.currentDriver].name}, give the wheel to ${
            this.mobsters[index].name
          }!`
        },
        {}
      );

      this.currentDriver = index;
    },

    toggleAvatar(index) {
      let mobster = this.mobsters[index];
      let avatar = avatarService.getAvatar();
      while (avatar === mobster.avatar) {
        avatar = avatarService.getAvatar();
      }

      mobster.avatar = avatar;

      this.$set(this.mobsters, index, mobster);
    }
  }
};
</script>

<style>
.flip-fade-move {
  transition: transform 0.5s;
}

.flip-fade-enter-active,
.flip-fade-leave-active {
  transition: opacity 0.2s;
}

.flip-fade-enter,
.flip-fade-leave-to {
  opacity: 0;
}

.dragger {
  cursor: pointer;
}
</style>
