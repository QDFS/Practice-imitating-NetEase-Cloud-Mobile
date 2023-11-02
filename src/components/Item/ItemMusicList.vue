<template>
  <div class="itemMusicList">
    <!-- 歌单播放信息列表 -->
    <div class="listTop">
      <div class="topLeft">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-24gl-playCircle"></use>
        </svg>
        <div>
          播放全部<span>(共{{ songs.length }}首)</span>
        </div>
      </div>
      <div class="topRight">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-jiahao"></use>
        </svg>
        <span>收藏({{ playlist.subscribedCount }})</span>
      </div>
    </div>
    <!-- 歌单的音乐 -->
    <div class="listContent">
      <div class="listItem" v-for="(item, i) in songs" :key="item.id">
        <span class="left">{{ i + 1 }}</span>
        <div class="message" @click="playMusic(songs, i)">
          <span>{{ item.name }}</span>
          <span>
            <i v-for="user in item.ar" :key="user.id"> {{ user.name }}</i>
          </span>
        </div>
        <div class="right">
          <svg class="icon" aria-hidden="true" v-show="item.mv">
            <use xlink:href="#icon-24gl-playSquare"></use>
          </svg>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-caidan"></use>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup(props) {
    props.playlist.tracks = "";
  },
  props: ["songs", "playlist"],
  methods: {
    // 点击播放音乐并传值
    playMusic(val, i) {
      this.$store.commit("changePlay", { val, i });
    },
  },
};
</script>

 <style lang="less" scoped>
.itemMusicList {
  width: 100%;
  padding: 0.2rem;
  margin-top: 0.2rem;
  background-color: #fff;
  border-top-left-radius: 0.4rem;
  border-top-right-radius: 0.4rem;
  .listTop {
    margin-top: 0.1rem;
    width: 100%;
    height: 0.8rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .topLeft {
      width: 50%;
      height: 100%;
      display: flex;
      align-items: center;
      div {
        font-weight: 700;
        font-size: 0.35rem;
        span {
          margin-left: 0.1rem;
          font-weight: 400;
          color: #999;
          font-size: 0.25rem;
        }
      }
      .icon {
        margin-right: 0.2rem;
      }
    }
    .topRight {
      width: 40%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #fe0001;
      border-radius: 0.5rem;
      color: #fff;
      .icon {
        fill: #fff;
        margin-right: 0.1rem;
      }
    }
  }
  .listContent {
    width: 100%;
    padding-bottom: 1.5rem;
    .listItem {
      width: 100%;
      height: 1.2rem;
      display: flex;
      align-items: center;
      // justify-content: space-around;
      .left {
        width: 10%;
        height: 100%;
        display: flex;

        align-items: center;
        color: #999;
      }
      .message {
        width: 70%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        :first-child {
          font-weight: 700;
        }
        :last-child {
          i {
            color: #999;
            font-weight: 400;
            font-style: normal;
            font-size: 0.25rem;
            margin-right: 0.4rem;
          }
        }
      }
      .right {
        width: 20%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        :last-child {
          margin-left: 0.3rem;
        }
      }
    }
  }
}
</style>