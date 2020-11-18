import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

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
    }
]

const router = new VueRouter({
    routes
})

export default router