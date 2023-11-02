<template>
  <div class="topNav">
    <div class="topLeft">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-hanbaocaidanzhedie"></use>
      </svg>
    </div>
    <div class="topContent">
      <span @click="$router.push('/userInfo')">我的</span>
      <span>发现</span>
      <span>云村</span>
      <span>视频</span>
    </div>
    <div class="topRight">
      <svg class="icon" aria-hidden="true" @click="$router.push('/search')">
        <use xlink:href="#icon-icon-test"></use>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: "TopNav",
};
</script>
 
 <style lang="less" scoped>
.topNav {
  width: 100%;
  height: 1rem;
  padding: 0.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .topContent {
    width: 65%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 0.35rem;
    :nth-child(2) {
      font-weight: 900;
    }
  }
}
</style>