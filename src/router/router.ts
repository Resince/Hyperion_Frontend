import { createRouter, createWebHistory } from 'vue-router'
import LoginRegister from "@/components/Login/LoginRegister.vue"

const routes=[
    {
        path: '/',
        redirect: '/login',
        // component: LoginRegister
    },
    {
        path: '/login',
        name: 'Login',
        component: LoginRegister
    },
    {
        path:'/consumer',
        name:'Consumer',
        component:()=>import('@/components/consumer/consumer.vue')
    }
]


const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
