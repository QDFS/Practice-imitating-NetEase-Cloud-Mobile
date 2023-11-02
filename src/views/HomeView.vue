<template>
  <div class="home">
    <top-nav />
    <top-swiper />
    <icon-list />
    <music-list />
  </div>
</template>

<script>
// @ is an alias to /src

import TopNav from "../components/Home/TopNav.vue";
import TopSwiper from "../components/Home/TopSwiper.vue";
import IconList from "../components/Home/IconList.vue";
import MusicList from "../components/Home/MusicList.vue";

export default {
  name: "HomeView",
  components: {
    TopNav,
    TopSwiper,
    IconList,
    MusicList,
  },
};
</script>

