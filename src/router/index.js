import Dashboard from '@/views/Dashboard.vue';
import {isTokenValid} from './auth/index';
import Profile from "@/views/Profile.vue";
import Login from "@/views/Login.vue";
import {createRouter, createWebHistory} from "vue-router";


const routes = [
    {
        path: "/",
        component: () => import('../views/Landing.vue'),
        name: 'index'
    },
    {
        path: "/login",
        component: Login,
        name: 'login'
    },
    {
        path: "/dashboard",
        component: Dashboard,
        name: 'dashboard',
        meta: {
            requiresAuth: true
        }
    },
    // Transaction //
    {
        path: "/transactions",
        component: () => import('../views/Transaction.vue'),
        name: 'transactions',
        meta: {
            requiresAuth: true
        }
    },
    // Transaction //
    {
        path: "/profile",
        component: Profile,
        name: 'profile',
        meta: {
            requiresAuth: true
        }
    },
    {
        path: "/registration",
        component: () => import('../views/Registration.vue'),
        name: 'registration'
    },

];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token');
    console.log(token)
    const isAuthenticated = isTokenValid(token);

    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!isAuthenticated) {
            next({
                path: '/login',
                query: {redirect: to.fullPath}
            });
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;