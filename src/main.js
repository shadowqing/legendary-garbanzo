import { createApp } from 'vue'
import App from './App.vue'
import {createPinia} from 'pinia'
import router from './router/index'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
let app=createApp(App)

router.beforeEach((to,from)=>{
    if(to.path!=='/login'){
        return {
            path:'/login'
        }
    }
})
app.use(router)
app.use(createPinia())
app.use(ElementPlus)
app.mount('#app')
