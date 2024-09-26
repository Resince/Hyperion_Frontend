import {createRouter, createWebHistory} from 'vue-router'
import LoginRegister from "@/components/Login/LoginRegister.vue"

const routes = [
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
        path: '/consumer',
        name: 'Consumer',
        component: () => import('@/components/consumer/consumer.vue'),
        // component: ()=> import ('@/layout/index.vue'),
        redirect: '/consumer/profile',
        children: [
            {
                path: 'profile',
                name: 'Profile',
                component: () => import('@/components/consumer/profile.vue')
            },
            {
                path: 'orders',
                name: 'Orders',
                component: () => import('@/components/consumer/orders.vue')
            },
            {
                path: 'trolly',
                name: 'Trolly',
                component: () => import('@/components/consumer/trolly.vue')
            },
            {
                path: 'shop',
                name: 'Shop',
                component: () => import('@/components/consumer/shop.vue')

            }
        ]
    }
]


const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
