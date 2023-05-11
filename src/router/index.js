import {createRouter,createWebHashHistory} from 'vue-router'

let routes=[
    {
        path:'/login',
        component:()=>import('../pages/loginCom.vue')
    },
    {
        path:'/home',
        component:()=>import('../pages/homeCom.vue')
    },

]

let router=createRouter({
    routes,
    history:createWebHashHistory()
})

export default router