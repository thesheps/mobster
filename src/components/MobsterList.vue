<template>
  <v-list>
    <v-subheader large>Mobsters</v-subheader>

    <v-list-tile class="mb-4">
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

    <v-dialog v-model="showBreakDialog" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">Time to take a break!</v-card-title>
        <v-card-text>Well done Mobsters, now go and recharge your batteries!</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click="showBreakDialog = false">Ok</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-list>
</template>

<script>
import draggable from "vuedraggable";
import eventBus from "../../src/utils/event-bus";
import notificationService from "../../src/utils/notification-service";

export default {
  components: {
    draggable
  },

  data: () => ({
    mobsterName: "",
    mobsters: [],
    errorText: "",
    showError: false,
    showBreakDialog: false,
    currentDriver: 0
  }),

  watch: {
    currentDriver(newValue, oldValue) {
      let lastDriver = this.mobsters[oldValue];
      if (lastDriver) {
        lastDriver.isDriving = false;
        this.$set(this.mobsters, oldValue, lastDriver);
      }

      let newDriver = this.mobsters[newValue];
      if (!newDriver) return;

      newDriver.isDriving = true;
      this.$set(this.mobsters, newValue, newDriver);
    }
  },

  mounted() {
    const self = this;

    eventBus.$on("rotateMobster", () => {
      self.rotateDriver();

      if (self.mobsters.length === 0) return;

      notificationService.raiseNotification(
        "Time to rotate!",
        self.mobsters[self.currentDriver].avatar,
        `Take the wheel, ${self.mobsters[self.currentDriver].name}!`
      );
    });

    eventBus.$on("takeABreak", () => {
      self.showBreakDialog = true;
      self.rotateDriver();

      notificationService.raiseNotification(
        "Break time!",
        "img/icons/coffee.png",
        "Step away from the keyboard!"
      );
    });
  },

  methods: {
    addMobster() {
      if (!this.mobsterName) {
        this.errorText = "Please enter a mobster name!";
        this.showError = true;
        return;
      }

      this.mobsters.push({
        id: this.mobsters.length,
        name: this.mobsterName,
        avatar: this.getAvatar(),
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
      this.currentDriver = index;
    },

    rotateDriver() {
      if (this.currentDriver === this.mobsters.length - 1) {
        this.currentDriver = 0;
      } else {
        this.currentDriver++;
      }
    },

    toggleAvatar(index) {
      let mobster = this.mobsters[index];
      let avatar = this.getAvatar();

      while (avatar === mobster.avatar) {
        avatar = this.getAvatar();
      }

      mobster.avatar = avatar;
      this.$set(this.mobsters, index, mobster);
    },

    getAvatar() {
      return `img/avatars/${Math.floor(Math.random() * 9) + 1}.jpg`;
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
