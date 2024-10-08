import ConsumerLayout from '@/layouts/consumerLayout/index.vue';
import ConsumerHome from '@/views/consumer/home/index.vue';
import LoginRegister from '@/views/login/index.vue';

const routes = [
  {
    path: '/test',
    name: 'test',
    component: () => import('@/views/consumer/home/components/card.vue'),
  },
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'LoginRegister',
    component: LoginRegister,
  },
  {
    path: '/consumer',
    name: 'ConsumerLayout1',
    component: ConsumerLayout,
    meta: {
      role: 'CONSUMER',
    },
    children: [
      {
        path: 'home/:category',
        name: 'ConsumerHome',
        component: ConsumerHome,
      },
      {
        path: 'shoppinglist',
        name: 'ShoppingList',
        component: () => import('@/views/consumer/shoppingList/index.vue'),
      },
      {
        path: 'profile',
        name: 'Profile',
        component: () => import('@/views/consumer/profile/index.vue'),
      },
      {
        path: 'goodsdetails/:id',
        name: 'GoodsDetails',
        component: () => import('@/views/consumer/goodsDetails/index.vue'),
      },
    ],
  },
  {
    path: '/merchant',
    name: 'ManagerLayout1',
    component: () => import('@/layouts/managerLayout/index.vue'),
    meta: {
      role: 'MERCHANT',
    },
    children: [
      {
        path: '',
        name: 'MerchantHome',
        component: () => import('@/views/merchant/home/index.vue'),
      },
      {
        path: 'commodityManage',
        name: 'CommodityManage',
        component: () => import('@/views/merchant/commodityManage/index.vue'),
      },
      {
        path: 'orderManage',
        name: 'OrderNanage',
        component: () => import('@/views/merchant/orderManage/index.vue'),
      },
      {
        path: 'orderdetails',
        name: 'OrderDetails',
        component: () => import('@/views/merchant/orderDetails/index.vue'),
      },
    ],
  },
  {
    path: '/admin',
    name: 'ManagerLayout',
    component: () => import('@/layouts/managerLayout/index.vue'),
    meta: {
      role: 'ADMIN',
    },
    children: [
      {
        path: 'merchantmanage',
        name: 'MerchantManage',
        component: () => import('@/views/admin/merchantManage/index.vue'),
      },
      {
        path: 'usermanage',
        name: 'UserManage',
        component: () => import('@/views/admin/userManage/index.vue'),
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404/index.vue'),
  },
];

export default routes;
