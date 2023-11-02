import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


// 2. 引入组件样式


const app = createApp(App)
app.use(store)
app.use(router)
app.mount('#app')
