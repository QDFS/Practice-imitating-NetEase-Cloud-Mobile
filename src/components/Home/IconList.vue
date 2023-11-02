<template>
  <div class="iconList">
    <div class="iconItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-tuijian"></use>
      </svg>
      <div class="text">每日推荐</div>
    </div>
    <div class="iconItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-dianshi"></use>
      </svg>
      <div class="text">私人FM</div>
    </div>
    <div class="iconItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-gequ"></use>
      </svg>
      <div class="text">歌单</div>
    </div>
    <div class="iconItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-paihangbang"></use>
      </svg>
      <div class="text">排行榜</div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

 <style lang="less" scoped>
.iconList {
  width: 100%;
  height: 2rem;
  padding: 0.2rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .iconItem {
    width: 25%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .icon {
      width: 1rem;
      height: 1rem;
    }
  }
}
</style>