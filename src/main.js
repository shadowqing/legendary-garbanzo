import { createApp } from 'vue'
//引入状态管理pinia
import { createPinia } from "pinia"
//引入路由
import router from "./router/index"
import App from './App.vue'
import piniaPluginPersistedstate from "pinia-plugin-persistedstate"
import { styleType } from 'element-plus/es/components/table-v2/src/common'

//引入element
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//引入css
import './assets/css/common.css'
//引入进度条
import 'nprogress/nprogress.css'

let app = createApp(App)

let pinia = createPinia();
//Pinia使用持久化存储
pinia.use(piniaPluginPersistedstate);



//路由钩子(全局前置守卫)
router.beforeEach((to, from) => {
    //判断sessionStorage中是否有token
    let token = sessionStorage.getItem('tk');
    if (!token) {
        //用户如果没有登入,用户访问其他页面一律跳转到登入页
        if (to.path !== "/login") {
            return {
                path: "/login"
            }
        }
    }
})

//使用路由
app.use(router)
app.use(pinia)
app.use(ElementPlus)
app.mount('#app')

