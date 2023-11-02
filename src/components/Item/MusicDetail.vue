<template>
  <img :src="playMusic.al.picUrl" alt="" class="bigImg" />
  <!-- 顶部 -->
  <div class="detailTop">
    <div class="detailTopLeft">
      <!-- 退出弹出层 -->
      <svg
        class="icon"
        aria-hidden="true"
        @click="
          musicLyric = false;
          playDetail();
        "
      >
        <use xlink:href="#icon-zuojiantou"></use>
      </svg>
      <!-- 播放歌曲信息 -->
      <div class="playMessage">
        <p>
          <Vue3Marquee :duration="5">{{ playMusic.name }}</Vue3Marquee>
        </p>
        <span v-for="item in playMusic.ar" :key="item.id">
          {{ item.name }}
        </span>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-jiantou_liebiaoxiangyou_o"></use>
        </svg>
      </div>
    </div>
    <!-- 分享 -->
    <div class="detailTopRght">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-fenxiang"></use>
      </svg>
    </div>
  </div>

  <!-- 播放歌曲图片及磁盘 -->
  <div class="detailContent" v-show="!musicLyric">
    <img
      src="../../assets/needle-ab.png"
      alt=""
      class="imgNeedle"
      :class="{ imgNeedle_active: !isbtnShow }"
    />
    <img src="../../assets/cd.png" alt="" class="imgCd" />
    <img
      :src="playMusic.al.picUrl"
      alt=""
      class="imgPlay"
      :class="{ imgPlay_start: !isbtnShow, imgPlay_pause: isbtnShow }"
      @click="musicLyric = true"
    />
  </div>

  <!-- 播放歌曲歌词部分 -->
  <div class="lyric" ref="musicLyr" v-show="musicLyric">
    <p
      v-for="item in lyricMethod"
      :key="item.id"
      :class="{
        active:
          parseInt(currentTime * 1000) > item.time &&
          parseInt(currentTime * 1000) < item.next,
      }"
    >
      {{ item.lyr }}
    </p>
  </div>

  <!-- 控制歌曲播放等功能 -->
  <div class="detailFoot">
    <!-- 歌曲功能操作 -->
    <div class="footTop">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-xihuan"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-download"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-yinle"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-xinxi"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-icon-"></use>
      </svg>
    </div>

    <!-- 播放歌曲的进度条 -->
    <div class="progressBar">
      <input
        class="range"
        type="range"
        min="0"
        :max="duration"
        v-model="currentTime"
        step="0.05"
      />
    </div>

    <!-- 歌曲功能操作 -->
    <div class="footer">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-24gl-repeat2"></use>
      </svg>

      <!-- 上一首 -->
      <svg class="icon" aria-hidden="true" @click="preMusic">
        <use xlink:href="#icon-shangyishoushangyige"></use>
      </svg>

      <!-- 暂停 -->
      <svg class="icon" aria-hidden="true" v-if="isbtnShow" @click="play">
        <use xlink:href="#icon-24gl-playCircle"></use>
      </svg>

      <!-- 播放 -->
      <svg class="icon" aria-hidden="true" v-else @click="play">
        <use xlink:href="#icon-bofangzhong"></use>
      </svg>

      <!-- 下一首 -->
      <svg class="icon" aria-hidden="true" @click="nextMusic">
        <use xlink:href="#icon-xiayigexiayishou"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-24gl-playlist2"></use>
      </svg>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { Vue3Marquee } from "vue3-marquee";
import "vue3-marquee/dist/style.css";
export default {
  data() {
    return {
      musicLyric: false,
    };
  },
  components: {
    Vue3Marquee,
  },
  methods: {
    //控制弹出层
    playDetail() {
      this.$store.commit("changeDetail");
    },

    // 播放上一首歌曲
    preMusic() {
      let index = this.playListIndex - 1;
      if (index <= 0) {
        index = this.playList.length - 1;
        this.$store.commit("changeplayListIndex", index);
      } else {
        this.$store.commit("changeplayListIndex", index);
      }
    },

    // 播放下一首歌曲
    nextMusic() {
      let index = this.playListIndex + 1;
      if (index >= this.playList.length) {
        index = 0;
        this.$store.commit("changeplayListIndex", index);
      } else {
        this.$store.commit("changeplayListIndex", index);
      }
    },

    //切换歌曲一个方法实现
    switch(num) {
      let index = this.playListIndex + num;
      if (index <= 0) {
        index = this.playList.length - 1;
      } else if (index >= this.playList.length) {
        index = 0;
      }
      this.$store.commit("changeplayListIndex", index);
    },
  },
  computed: {
    ...mapState([
      "lyricList",
      "currentTime",
      "playListIndex",
      "playList",
      "duration",
    ]),

    //对歌词进行分解操作
    lyricMethod() {
      let arr = [];
      if (this.lyricList.lyric) {
        let id = 0;
        arr = this.lyricList.lyric.split(/\n/).map((item, i) => {
          ++id;
          let min = item.slice(item.indexOf("[") + 1, item.indexOf(":"));
          let sec = item.slice(item.indexOf(":") + 1, item.indexOf("."));
          let mill = item.slice(item.indexOf(".") + 1, item.indexOf("]"));
          let lyr = item.slice(item.indexOf("]") + 1, item.length);
          let time =
            parseInt(min * 60 * 1000) + parseInt(sec * 1000) + parseInt(mill);
          // console.log(min, sec, mill, lyr);
          return { id, min, sec, mill, lyr, time };
        });

        arr.forEach((item, i) => {
          if (i === arr.length - 1) {
            item.next = 1000000;
          } else {
            item.next = arr[i + 1].time;
          }
        });
        // console.log(arr, "arr");
      }
      return arr;
    },
  },
  watch: {
    // 获取歌曲播放中的时间
    currentTime() {
      let p = document.querySelector("p.active");
      // console.log([p]);
      // console.log([this.$refs.musicLyr]);
      if (p && p.offsetTop > 300) {
        this.$refs.musicLyr.scrollTop = p.offsetTop - 300;
      }
    },
  },
  props: ["playMusic", "isbtnShow", "play"],
};
</script>

 <style lang="less" scoped>
.bigImg {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1;
  filter: blur(1rem);
}
.detailTop {
  width: 100%;
  height: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.2rem;
  .icon {
    fill: #fff;
  }
  .detailTopLeft {
    width: 90%;
    height: 100%;
    display: flex;
    align-items: center;
    .icon {
      width: 0.5rem;
      margin-right: 0.2rem;
    }
    .playMessage {
      // margin-left: 0.2rem;
      max-width: 5.6rem;
      min-width: 1rem;
      height: 100%;
      p {
        color: #fff;
      }
      .icon {
        margin: 0 0 0 -0.2rem;
        vertical-align: middle;
        fill: #999;
      }
      span {
        display: inline-block;
        font-size: 0.25rem;
        color: #999;
        margin-right: 0.2rem;
      }
    }
  }
  .detailTopRght {
    width: 10%;
    text-align: right;
    .icon {
      width: 25px;
    }
  }
}
.detailContent {
  width: 100%;
  height: 8.8rem;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  .imgNeedle {
    width: 30%;
    height: 3.5rem;
    position: absolute;
    right: 1.6rem;
    transition: transform 2s;
    transform: rotate(-18deg);
  }
  .imgNeedle_active {
    width: 30%;
    height: 3.5rem;
    position: absolute;
    right: 1.6rem;
    transition: transform 2s;
    transform: rotate(6deg);
  }
  .imgCd {
    width: 5rem;
    position: absolute;
    top: 2.2rem;
    right: 1.1rem;
    z-index: -1;
  }
  .imgPlay {
    position: absolute;
    top: 3.15rem;
    right: 2.05rem;
    border-radius: 50%;
    width: 3.1rem;
    animation: rotate 10s linear infinite;
  }

  .imgPlay_pause {
    animation-play-state: paused;
  }

  .imgPlay_start {
    animation-play-state: running;
  }

  @keyframes rotate {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
.lyric {
  width: 100%;
  height: 8.8rem;
  padding: 0 0.8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: scroll;
  transition: all 2s;
  p {
    margin-bottom: 0.35rem;
    color: #3e3d3a;
  }
  .active {
    transition: all 0.8s;
    color: #fff;
    font-size: 0.4rem;
  }
}
.detailFoot {
  width: 100%;
  padding: 0.2rem;
  position: absolute;
  bottom: 0;
  .footTop {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .icon {
      fill: #fff;
    }
    :nth-child(3) {
      width: 0.6rem;
      height: 0.6rem;
    }
  }
  // 播放的进度条
  .progressBar {
    width: 100%;
    height: 0.6rem;
    // background-color: #fff;
    .range {
      width: 100%;
      height: 0.05rem;
    }
  }
  .footer {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .icon {
      fill: #fff;
    }
    :nth-child(3) {
      width: 0.8rem;
      height: 0.8rem;
    }
  }
}
</style>