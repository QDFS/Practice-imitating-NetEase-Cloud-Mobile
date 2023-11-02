<template>
  <div class="itemMusic">
    <item-music-top :playlist="state.playlist" />
    <item-music-list :songs="state.songs" :playlist="state.playlist" />
  </div>
</template>

<script>
import itemMusicTop from "../components/Item/ItemMusicTop.vue";
import itemMusicList from "../components/Item/ItemMusicList.vue";
import { useRoute } from "vue-router";
import { reactive, onMounted } from "vue";
import { getMusicItem, getSongs } from "../request/api/item";
export default {
  setup() {
    const state = reactive({
      playlist: {},
      songs: [],
    });

    onMounted(async () => {
      // 获取歌单详情
      let id = useRoute().query.id;
      let res = await getMusicItem(id);
      // console.log(res, "res");
      state.playlist = res.data.playlist;

      // 获取歌单信息
      const songsId = res.data.playlist.trackIds;
      const songsArray = [];
      songsId.forEach((item) => {
        songsArray.push(item.id);
      });
      let songsMessage = await getSongs(songsArray.toString());
      // console.log(songsMessage, "songsMessage");
      state.songs = songsMessage.data.songs;
      // console.log(state.songs, "songs");
    });

    return { state };
  },
  components: {
    itemMusicTop,
    itemMusicList,
  },
};
</script>

<style>
</style>