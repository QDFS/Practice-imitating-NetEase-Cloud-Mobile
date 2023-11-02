<template>
  <div class="TopSwiper">
    <van-swipe :autoplay="3000" lazy-render>
      <van-swipe-item v-for="image in state.images" :key="image">
        <img :src="image.pic" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>


<script>
import { getBanner } from "../../request/api/home";
import { reactive, onMounted } from "vue";
export default {
  name: "TopSwiper",
  setup() {
    const state = reactive({
      images: [],
    });

    onMounted(async () => {
      let result = await getBanner();
      // console.log(result);
      state.images = result.data.banners;
    });
    return { state };
  },
};
</script>

 <style lang="less"  >
.TopSwiper {
  width: 100%;
  .van-swipe {
    width: 100%;
    .van-swipe__track {
      width: 100%;
      .van-swipe-item {
        width: 100%;
        padding: 0.2rem;
        img {
          border-radius: 5px;
          width: 100%;
          height: 3rem;
        }
      }
    }
    .van-swipe__indicators {
      .van-swipe__indicator--active {
        background-color: #ff6666;
      }
    }
  }
}
</style>