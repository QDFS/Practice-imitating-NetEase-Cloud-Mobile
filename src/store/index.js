import { createStore } from 'vuex'
import { getLyric } from '../request/api/item'
export default createStore({
  state: {

    //播放歌曲列表，及默认播放歌曲
    playList: [{
      al: {
        id: 19243,
        name: "吻别",
        pic: 109951166032666620,
        picUrl: "https://p2.music.126.net/8cxEF5lBfKLWbAqrF0yVmg==/109951166032666632.jpg",
        pic_str: "109951166032666632",
      },
      id: 190449,
      name: '吻别',
      ar: [{
        id: 6460,
        name: "张学友"
      }]
    }],

    // 歌曲索引
    playListIndex: 0,

    //控制播放按钮状态信息
    isbtnShow: true,

    // 控制弹出层
    musicDetail: false,

    // 歌词部分
    lyricList: {},

    //歌曲播放中的时间
    currentTime: 0,

    //播放中歌曲的总时间
    duration: 0,

    //记录用户是否登录
    isLogin: false,

    //定义底部部分组件是否显示
    playShow: true,

    //扫码登录获得的cookie
    cookie: null,

    //用户信息
    userInfo: {}

  },
  getters: {
  },
  mutations: {
    changeStatus(state) {
      state.isbtnShow = !state.isbtnShow
    },

    // 添加播放歌曲
    updatePlayList(state, val) {
      state.playList.push(val)
    },

    //控制播放信息和播放栏信息
    changePlay(state, val) {
      state.playList = val.val
      state.playListIndex = val.i

    },

    //切换歌曲，改变播放歌曲索引
    changeplayListIndex(state, val) {
      state.playListIndex = val
    },

    // 控制弹出层
    changeDetail(state) {
      state.musicDetail = !state.musicDetail
    },

    //改变歌词数据
    changeLyric(state, val) {
      state.lyricList = val
    },

    //改变歌曲中播放中的时间
    changeCurrentTime(state, val) {
      state.currentTime = val
    },

    // 更新播放歌曲的总时间
    changeDuration(state, val) {
      state.duration = val
      // console.log(val)
    },


    //更改底部部分是否显示
    changePlayShow(state, val) {
      state.playShow = val
    },

    //登陆成功更改登录状态
    changeIsLogin(state, val) {
      state.isLogin = val
    },

    //扫码登录成功添加Cookie
    changeCookie(state, val) {
      state.cookie = val
    },

    // 更新用户信息
    changeUserInfo(state, val) {
      state.userInfo = val
    }
  },
  actions: {

    // 根据歌曲id获取歌词
    async playMusicid(content, val) {
      let res = await getLyric(val)
      // console.log(res, 'res')
      content.commit("changeLyric", res.data.lrc)
    }
  },
  modules: {
  }
})
