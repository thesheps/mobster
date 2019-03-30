<template>
  <div>
    <Timer></Timer>
    <MobsterList></MobsterList>
  </div>
</template>

<script>
import Timer from "../components/Timer.vue";
import MobsterList from "../components/MobsterList.vue";

export default {
  components: {
    Timer,
    MobsterList
  }
};
</script>
