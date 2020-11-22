import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}



const routes = [{
        path: '/',
        name: 'Login',
        component: () =>
            import ('../views/Login.vue')
    },
    {
        path: '/home',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/register',
        name: 'Register',
        component: () =>
            import ('../views/Register.vue')
    },
    {
        path: '/createissue',
        name: 'CreateIssue',
        component: () =>
            import ('../views/CreateIssue.vue')
    },
    {
        path: '/accountinquiry',
        name: 'AccountInquiry',
        component: () =>
            import ('../views/AccountInquiry.vue')
    },
    {
        path: '/reportissue',
        name: 'ReportIssue',
        component: () =>
            import ('../views/ReportIssue.vue')
    },
    {
        path: '/Detail2',
        name: 'Detail2',
        component: () =>
            import ('../views/Detail2.vue')
    },
    {
        path: '/Detail',
        name: 'Detail',
        component: () =>
            import ('../views/Detail.vue')
    }
]

const router = new VueRouter({
    routes
})

export default router