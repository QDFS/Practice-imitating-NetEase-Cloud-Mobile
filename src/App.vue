<template>
  <router-view />
  <music-foot v-show="$store.state.playShow" />
</template>

 <script>
import MusicFoot from "./components/Item/MusicFoot.vue";
export default {
  components: {
    MusicFoot,
  },
};
</script>
<style lang="less">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.icon {
  width: 0.5rem;
  height: 0.5rem;
}
</style>
