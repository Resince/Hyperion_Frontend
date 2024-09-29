import {createRouter, createWebHistory} from 'vue-router'
import LoginRegister from "@/components/Login/LoginRegister.vue"
import store from "@/store";

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

router.beforeEach((to,from,next)=> {
    const isLoggedIn = Boolean(localStorage.getItem('token'));
    console.log('isLoggedIn:',isLoggedIn);
    const userRole = store.state.userInfo?.role;
    console.log('userRole:',userRole);

    if (!isLoggedIn && to.path !== '/login') {
        next('/login');
    } else {
        next();
    }
});


export default router
