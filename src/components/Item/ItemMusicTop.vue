<template>
  <div class="itemMusicTop">
    <img :src="playlist.coverImgUrl" alt="" class="bigImg" />
    <div class="musicTopLeft">
      <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
        <use xlink:href="#icon-zuojiantou"></use>
      </svg>
      <span>歌单</span>
    </div>
    <div class="musicTopRight">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-sousuo-copy"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-caidan-copy"></use>
      </svg>
    </div>
  </div>
  <div class="itemMusicBody">
    <div class="itemBodyLeft">
      <div class="heat">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-a24gl-play"></use>
        </svg>
        <span>{{ changPlayCount(playlist.playCount) }}</span>
      </div>
      <img :src="playlist.coverImgUrl" alt="" />
    </div>
    <div class="itemBodyRight">
      <p class="playlistName">{{ playlist.name }}</p>
      <div class="userMessage">
        <img :src="playlist.creator.backgroundUrl" alt="" />
        <span>{{ playlist.creator.nickname }}</span>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-jiantou_liebiaoxiangyou_o"></use>
        </svg>
      </div>
      <!-- <p class="playlistdescription">{{ changeWord(playlist.description) }}</p> -->
      <!-- <div> -->
      <p class="playlistdescription">{{ playlist.description }}</p>
      <!-- <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-jiantou_liebiaoxiangyou_o"></use>
        </svg> -->
      <!-- </div> -->
    </div>
  </div>
  <div class="itemMusicFoot">
    <div class="footItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-xinxi"></use>
      </svg>
      <span>{{ playlist.commentCount }}</span>
    </div>
    <div class="footItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-fenxiang"></use>
      </svg>
      <span>{{ playlist.shareCount }}</span>
    </div>
    <div class="footItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-download"></use>
      </svg>
      <span>下载</span>
    </div>
    <div class="footItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-show_duoxuan"></use>
      </svg>
      <span>多选</span>
    </div>
  </div>
</template>

<script>
export default {
  setup(props) {
    props.playlist.creator = "";

    // function changeWord(val) {
    //   var res = val.split(/\n/)[0];
    //   return res;
    // }
    const changPlayCount = (val) => {
      if (val > 100000000) {
        return (val / 100000000).toFixed(1) + "亿";
      } else if (val > 10000) {
        return (val / 10000).toFixed(1) + "万";
      } else {
        return val;
      }
    };

    return { changPlayCount };
  },

  props: ["playlist"],
};
</script>
 
<style lang="less" scoped >
.itemMusicTop {
  width: 100%;
  height: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .musicTopRight,
  .musicTopLeft {
    margin: 0 0.2rem;
    width: 25%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .icon {
      fill: #fff;
    }
    span {
      color: #fff;
      font-size: 0.4rem;
    }
  }
  .bigImg {
    width: 100%;
    height: 11rem;
    position: fixed;
    z-index: -1;
    filter: blur(30px);
  }
}

.itemMusicBody {
  width: 100%;
  height: 3.1rem;
  padding: 0.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .itemBodyLeft {
    width: 40%;
    position: relative;
    .heat {
      position: absolute;
      top: 0.07rem;
      right: 0.4rem;
      display: flex;
      align-items: center;
      .icon {
        width: 0.4rem;
        height: 0.4rem;
        fill: #fff;
        margin-right: 0.1rem;
      }
      span {
        color: #fff;
      }
    }
    img {
      width: 2.5rem;
      height: 2.6rem;
      border-radius: 0.2rem;
    }
  }
  .itemBodyRight {
    height: 100%;
    width: 60%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: auto;
    .playlistName {
      font-weight: 700;
      color: #fff;
      font-size: 0.35rem;
    }
    .userMessage {
      display: flex;
      align-items: center;
      margin: 0.2rem 0;

      span {
        color: #9c9ba0;
      }
      img {
        margin-right: 0.1rem;
        width: 0.6rem;
        height: 0.6rem;
        border-radius: 50%;
      }
      .icon {
        width: 0.6rem;
        height: 0.6rem;
        fill: #9c9ba0;
      }
    }
    p {
      font-size: 0.25rem;
      color: #ccc;
    }
  }
}

.itemMusicFoot {
  margin-top: 0.4rem;
  width: 100%;
  height: 1.2rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .footItem {
    width: 25%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    span {
      color: #fff;
    }
    .icon {
      fill: #fff;
    }
  }
}
</style>