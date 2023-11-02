<template>
  <div class="musicList">
    <div class="musicTop">
      <div class="musicCount">发现好歌单</div>
      <div class="more">查看更多</div>
    </div>
    <div class="musicContent">
      <van-swipe :loop="false" :width="145" :show-indicators="false">
        <van-swipe-item
          class="musicItem"
          v-for="item in musicItems.message"
          :key="item.id"
        >
          <router-link :to="{ path: '/itemMusic', query: { id: item.id } }">
            <img :src="item.picUrl" />
            <div class="heat">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-a24gl-play"></use>
              </svg>
              <span>{{ changPlayCount(item.playCount) }}</span>
            </div>
            <p>{{ item.name }}</p>
          </router-link>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script>
import { getMusicList } from "../../request/api/home";
import { reactive, onMounted } from "vue";
export default {
  name: "MusicList",
  setup() {
    const musicItems = reactive({
      message: [],
    });
    onMounted(async () => {
      let musicList = await getMusicList();
      // console.log(musicList);
      musicItems.message = musicList.data.result;
    });

    const changPlayCount = (val) => {
      if (val > 100000000) {
        return (val / 100000000).toFixed(1) + "亿";
      } else if (val > 10000) {
        return (val / 10000).toFixed(1) + "万";
      } else {
        return val;
      }
    };

    onMounted(() => {
      changPlayCount();
    });

    return { musicItems, changPlayCount };
  },
};
</script>

 <style lang="less" scoped>
.musicList {
  margin-top: -0.2rem;
  width: 100%;
  padding: 0.2rem;
  .musicTop {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .musicCount {
      font-size: 0.4rem;
      font-weight: 900;
    }
    .more {
      width: 1.8rem;
      height: 0.64rem;
      border: 1px solid #ccc;
      text-align: center;
      line-height: 0.64rem;
      border-radius: 0.6rem;
    }
  }
  .musicContent {
    margin-top: 0.3rem;
    width: 100%;
    .musicItem {
      position: relative;
      width: 3rem;
      img {
        width: 2.7rem;
        height: 2.7rem;
        border-radius: 0.2rem;
      }
      .heat {
        color: #fff;
        position: absolute;
        top: 0.05rem;
        right: 0.4rem;
        overflow: hidden;
        width: 1.75rem;
        height: 0.8rem;
        .icon {
          fill: #fff;
          padding-right: 0.05rem;
        }
        span {
          display: block;
          position: absolute;
          top: 0.06rem;
          right: 0;
        }
      }
      p {
        padding-right: 0.3rem;
        color: #666666;
      }
    }
  }
}
</style>