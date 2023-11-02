<template>
  <svg class="icon" aria-hidden="true" @click="$router.push('/')">
    <use xlink:href="#icon-zuojiantou"></use>
  </svg>
  <div class="userInfo">
    <img :src="userInfo.avatarUrl" alt="" />
    <div><strong>用户昵称：</strong>{{ userInfo.nickname }}</div>
    <button class="quit" @click="logoff">退出登录</button>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  methods: {
    logoff() {
      this.$store.commit("changeIsLogin", false);
      this.$store.commit("changeCookie", null);
      this.$store.commit("changeUserInfo", null);
      localStorage.removeItem("userInfo");
      localStorage.getItem("cookie") ? 0 : localStorage.removeItem("cookie");
      this.$router.push("/");
    },
  },

  computed: {
    userInfo() {
      return (this.userInfo =
        this.$store.state.userInfo ||
        JSON.parse(localStorage.getItem("userInfo")));
    },
  },
};
</script>

 <style lang="less" scoped>
.icon {
  margin: 0.2rem;
}
.userInfo {
  // width: 6rem;
  height: 6rem;
  margin: 1rem auto;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  font-size: 0.35rem;
  img {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
  }
  .quit {
    width: 2rem;
    height: 1rem;
    font-weight: 700;
    background-color: #fff;
    border: 0.02rem solid #ccc;
    border-radius: 0.2rem;
  }
}
</style>