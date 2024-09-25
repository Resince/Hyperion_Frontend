import { createRouter, createWebHistory } from 'vue-router'
import LoginRegister from "@/components/Login/LoginRegister.vue"

const routes=[
    {
        path: '/',
        redicrect: '/login',
        // name: 'LoginRegister',
        component: LoginRegister
    },
    {
        path: '/login',
        name: 'Login',
        component: LoginRegister
    }
]


const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
