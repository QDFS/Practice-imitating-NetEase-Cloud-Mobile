<template>
  <div class="login">
    <svg class="icon quit" aria-hidden="true" @click="backOut">
      <use xlink:href="#icon-zuojiantou"></use>
    </svg>
    <!-- 验证码登录 -->
    <div class="entry" v-if="switchLogin">
      <h3>请登录</h3>
      <input type="number" placeholder="请输入手机号" v-model.number="phone" />
      <div class="code">
        <input type="number" placeholder="请输入验证码" v-model.number="code" />
        <button @click="getCode">获取验证码</button>
      </div>
      <input type="button" value="登录" @click="login" />
    </div>

    <!-- 手机扫码登录 -->
    <div class="codeLogin" v-else>
      <h3>扫码登录</h3>
      <canvas ref="canvas" height="150" width="150"></canvas>
      <span v-show="codeMessage">{{ codeMessage }}</span>
      <span @click="codeLogin">点击我获取二维码</span>
    </div>

    <!-- 切换登录方法 -->
    <div class="change" @click="changeLogin">点击切换登录方式</div>
  </div>
</template>

<script>
import {
  codeLoginKey,
  codeLoginCreate,
  codeLoginCheck,
  phoneLoginSent,
  phoneLoginVerify,
} from "../request/api/home";

import QRCode from "qrcode";
export default {
  data() {
    return {
      phone: null,
      code: null,

      //切换登录方式
      switchLogin: true,

      // 扫码登录信息
      codeMessage: "",
      timer: "",
    };
  },
  methods: {
    changeLogin() {
      this.switchLogin = !this.switchLogin;
    },

    backOut() {
      this.$router.push("/");
      clearInterval(this.timer);
    },

    async getCode() {
      let reg =
        /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
      if (reg.test(this.phone)) {
        let res = await phoneLoginSent(this.phone);
        if (res.data.data) {
          alert("验证码已发送");
        }
        console.log(res);
      } else {
        alert("请输入正确的号码");
      }
    },

    //  验证码登录
    async login() {
      let val = await phoneLoginVerify({ phone: this.phone, code: this.code });
      console.log(val);

      if (val.data.data) {
        let userInfo = {
          avatarUrl: "https://api.likepoems.com/img/pc",
          nickname: "无",
        };

        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        this.$store.commit("changeUserInfo", userInfo);

        //更改登录状态表
        this.$store.commit("changeIsLogin", true);

        this.$router.push("/");
        alert("登录成功");

        this.phone = null;
        this.code = null;
      } else {
        alert("登录失败，请稍后再试");
      }
    },

    //  扫码登录
    async codeLogin() {
      let res = await codeLoginKey();
      console.log(res);

      let val = await codeLoginCreate(res.data.data.unikey);
      console.log(val);

      // 将qrurl生成二维码并呈现
      QRCode.toCanvas(this.$refs.canvas, val.data.data.qrurl);

      let result = null;

      this.timer = setInterval(async () => {
        result = await codeLoginCheck(res.data.data.unikey);

        let code = result.data.code;

        if (code === 800) {
          this.codeMessage = result.data.message;
        } else if (code === 801) {
          this.codeMessage = result.data.message;
          console.log(result);
        } else if (code === 802) {
          this.codeMessage = result.data.message;
          // 添加用户昵称和用户图像
          this.$store.commit("changeUserInfo", result.data);
          localStorage.setItem("userInfo", JSON.stringify(result.data));
          console.log(result);
        } else if (code === 803) {
          this.codeMessage = result.data.message;
          //更改登录状态表
          this.$store.commit("changeIsLogin", true);
          //添加cookie
          this.$store.commit("changeCookie", result.data.cookie);
          // 将cookie存入localStorage中
          localStorage.setItem("cookie", JSON.stringify(result.data.cookie));
          console.log(result);
          this.$router.push("/");
          clearInterval(timer);
        }
      }, 1000);
    },
  },
  mounted() {},
};
</script>

 <style lang="less" scoped>
.login {
  width: 100vw;
  height: 100vh;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  .quit {
    position: absolute;
    top: 0.2rem;
    left: 0.2rem;
  }

  .entry {
    width: 5rem;
    height: 5rem;
    border: 0.02rem solid #ccc;
    border-radius: 0.6rem;
    box-shadow: 0 0 0.3rem 0.01rem #ccc;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;

    .code {
      position: relative;
      button {
        position: absolute;
        right: 0.1rem;
        top: -0.1rem;
        padding: 0.1rem;
        background-color: #fff;
        border: 1px solid #ccc;
        border-radius: 0.2rem;
        color: skyblue;
      }
    }
    input[type="number"] {
      height: 0.6rem;
      padding: 0.2rem;
      outline-style: none;
      border: none;
      border-bottom: 1px solid #ccc;
    }
    input[type="button"] {
      width: 1.8rem;
      height: 0.8rem;
      border: none;
      border-radius: 0.2rem;
      background-color: rgb(64, 158, 255);
    }
  }

  .codeLogin {
    width: 5.5rem;
    height: 6rem;
    border: 0.02rem solid #ccc;
    border-radius: 0.6rem;
    box-shadow: 0 0 0.3rem 0.01rem #ccc;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
  }

  .change {
    position: absolute;
    bottom: 0.4rem;
    color: #999;
    font-size: 0.35rem;
  }
}
</style>