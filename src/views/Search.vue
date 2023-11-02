<template>
  <!-- 搜索 -->
  <div class="search">
    <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
      <use xlink:href="#icon-zuojiantou"></use>
    </svg>
    <input
      type="text"
      class="searchBox"
      placeholder="周杰伦"
      v-model.trim="keyWord"
      @keyup.enter="searchWord"
    />
    <svg class="icon" aria-hidden="true" @click="searchWord">
      <use xlink:href="#icon-sousuo"></use>
    </svg>
  </div>

  <!-- 搜索历史 -->
  <div class="searchHistory">
    <span class="history">历史</span>
    <span
      v-for="item in searchWordList"
      :key="item"
      class="keyWord"
      @click="searchHistory(item)"
    >
      {{ item }}
    </span>
    <svg class="icon" aria-hidden="true" @click="deleteWord">
      <use xlink:href="#icon-shanchu"></use>
    </svg>
  </div>

  <!-- 搜索的歌曲 -->
  <div class="listContent">
    <div class="listItem" v-for="(item, i) in searchList" :key="item.id">
      <span class="left">{{ i + 1 }}</span>
      <div class="message" @click="playSearch(item)">
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
</template>

<script>
import { searchKeyWord } from "../request/api/home";
export default {
  data() {
    return {
      searchWordList: [],
      keyWord: "",
      searchList: [],
    };
  },

  mounted() {
    this.searchWordList =
      JSON.parse(localStorage.getItem("searchWordList")) || [];
  },

  methods: {
    // 搜索功能
    async searchWord() {
      if (this.keyWord === "") {
        alert("输入不能为空");
        return;
      }

      this.searchWordList.unshift(this.keyWord);
      this.searchWordList = [...new Set(this.searchWordList)];

      if (this.searchWordList.length > 8) {
        this.searchWordList.splice(this.searchWordList.length - 1, 1);
      }

      //将搜索历史存入localStorage
      localStorage.setItem(
        "searchWordList",
        JSON.stringify(this.searchWordList)
      );

      let res = await searchKeyWord(JSON.stringify(this.keyWord));

      console.log(res);

      this.searchList = res.data.result.songs;

      this.keyWord = "";
    },

    //清除搜索记录
    deleteWord() {
      this.searchWordList = [];
      localStorage.removeItem("searchWordList");
    },

    // 点击历史搜索记录搜索
    async searchHistory(val) {
      let res = await searchKeyWord(JSON.stringify(val));
      this.searchList = res.data.result.songs;

      console.log(res);
    },

    // 点击搜索的音乐播放
    playSearch(val) {
      this.$store.commit("updatePlayList", val);
      this.$store.commit(
        "changeplayListIndex",
        this.$store.state.playList.length - 1
      );
    },
  },
};
</script>

 <style lang="less" scoped>
.search {
  width: 100%;
  height: 1rem;
  padding: 0 0.2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .searchBox {
    width: 80%;
    margin: 0 0.2rem;
    border: none;
    border-bottom: 1px solid #999;
    padding: 0.1rem;
  }
}

.searchHistory {
  width: 100%;
  padding: 0.2rem;
  position: relative;
  //   display: flex;
  //   align-items: center;

  .history {
    font-weight: 700;
  }
  .keyWord {
    padding: 0.15rem 0.35rem;
    background-color: rgb(237, 229, 229);
    border-radius: 0.4rem;
    margin: 0.1rem 0.2rem;
    display: inline-block;
  }
  .icon {
    position: absolute;
    right: 0.2rem;
    // margin-top: 10px;
  }
}

.listContent {
  width: 100%;
  padding: 0.2rem 0.2rem 1.5rem 0.2rem;
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
</style>