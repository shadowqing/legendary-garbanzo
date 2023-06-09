import { createRouter, createWebHashHistory } from "vue-router"

let routes = [
    {
        path: "/home",
        component: ()=>import("../pages/home.vue"),
    },

    {
        path: "/login",
        component: () => import("../pages/login.vue")
    },
    
]

let router = createRouter({
    routes,
    history: createWebHashHistory()
})

export default router;