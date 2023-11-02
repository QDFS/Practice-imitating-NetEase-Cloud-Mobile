<template>
  <div class="musicFoot">
    <div class="left" @click="playDetail()">
      <img :src="playList[playListIndex].al.picUrl" alt="" />
      <div class="playMessage">
        <span>{{ playList[playListIndex].name }}</span>
        <span>横滑可以切换上下首哦</span>
      </div>
    </div>
    <div class="right">
      <svg class="icon mgr" aria-hidden="true" @click="play()" v-if="isbtnShow">
        <use xlink:href="#icon-24gl-playCircle"></use>
      </svg>
      <svg class="icon mgr" aria-hidden="true" @click="play()" v-else>
        <use xlink:href="#icon-bofangzhong"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-24gl-playlist2"></use>
      </svg>
      <audio
        ref="audioRef"
        :src="`https://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}.mp3`"
      ></audio>
      <van-popup
        v-model:show="musicDetail"
        position="bottom"
        :style="{ height: '100%' }"
      >
        <music-detail
          :playMusic="playList[playListIndex]"
          :play="play"
          :isbtnShow="isbtnShow"
        />
      </van-popup>
    </div>
  </div>
</template>

<script>
// import { useStore } from "vuex";
// import { computed, ref, onMounted, watch } from "vue";
import { mapState, mapMutations } from "vuex";
import MusicDetail from "./MusicDetail.vue";
export default {
  data() {
    return {
      timer: null,
    };
  },

  components: {
    MusicDetail,
  },

  computed: {
    ...mapState(["playList", "playListIndex", "isbtnShow", "musicDetail"]),
  },
  methods: {
    ...mapMutations(["changeDuration"]),

    //控制歌曲是否播放
    play() {
      const audioRef = this.$refs.audioRef;

      console.log([audioRef], "audioRef");

      if (audioRef.paused) {
        // 播放歌曲
        audioRef.play();

        //开启记录歌词播放中的时间
        this.getcurrentTime();

        // 改变播放状态
        this.$store.commit("changeStatus");

        //将播放的歌曲总时间传输到vuex中
        this.changeDuration(audioRef.duration);
      } else {
        audioRef.pause();
        // 清除定时器
        clearInterval(this.timer);
        this.$store.commit("changeStatus");
      }
    },

    //控制弹出层状态
    playDetail() {
      this.$store.commit("changeDetail");

      //将播放的歌曲总时间传输到vuex中
      this.changeDuration(this.$refs.audioRef.duration);
    },

    //获取歌曲播放中的时间
    getcurrentTime() {
      this.timer = setInterval(() => {
        this.$store.commit(
          "changeCurrentTime",
          this.$refs.audioRef.currentTime
        );
        // console.log(this.$refs.audioRef.currentTime);
      }, 500);
    },
  },
  watch: {
    playListIndex() {
      // 获取播放中的歌曲歌词
      this.$store.dispatch("playMusicid", this.playList[this.playListIndex].id);

      //将播放的歌曲总时间传输到vuex中
      this.changeDuration(this.$refs.audioRef.duration);

      //点击歌单歌曲播放
      this.$refs.audioRef.autoplay = true;

      // 清除定时器
      clearInterval(this.timer);
      //开启记录歌词播放中的时间
      this.getcurrentTime();

      if (this.isbtnShow) {
        this.$store.commit("changeStatus");
      }
    },
    playList() {
      // 获取播放中的歌曲歌词
      this.$store.dispatch("playMusicid", this.playList[this.playListIndex].id);

      //将播放的歌曲总时间传输到vuex中
      this.changeDuration(this.$refs.audioRef.duration);

      //点击歌单第一首歌曲播放
      this.$refs.audioRef.autoplay = true;

      //开启记录歌词播放中的时间
      this.getcurrentTime();

      if (this.isbtnShow) {
        this.$store.commit("changeStatus");
      }
    },
  },

  mounted() {
    this.$store.dispatch("playMusicid", this.playList[this.playListIndex].id);
  },
};
</script>
 
<style lang="less" scoped>
.musicFoot {
  width: 100%;
  height: 1.5rem;
  padding: 0 0.2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  border-top: 0.02rem solid #ccc;
  background-color: #fff;
  .left {
    display: flex;
    align-items: center;
    img {
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
      margin-right: 0.2rem;
    }
    .playMessage {
      display: flex;
      flex-direction: column;
      :last-child {
        color: #999;
        font-size: 0.25rem;
      }
    }
  }
  .right {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .mgr {
      margin-right: 0.4rem;
    }
  }
}
</style>