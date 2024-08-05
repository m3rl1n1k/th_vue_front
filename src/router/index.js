import { createRouter, createWebHistory } from 'vue-router';
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import DashboardView from "@/views/DashboardView.vue"; // Імпортуйте відсутні компоненти
import TransactionsView from "@/views/TransactionsView.vue"; // Імпортуйте відсутні компоненти
import ProfileView from "@/views/ProfileView.vue"; // Імпортуйте відсутні компоненти

import { isTokenValid } from './auth';

const routes = [
    {
        path: "/login",
        component: LoginView,
        name: 'login'
    },
    {
        path: "/dashboard",
        component: DashboardView,
        name: 'dashboard',
        meta: {
            requiresAuth: true
        }
    },
    // Transaction
    {
        path: "/transactions",
        component: TransactionsView,
        name: 'transactions',
        meta: {
            requiresAuth: true
        }
    },
    {
        path: "/profile",
        component: ProfileView,
        name: 'profile',
        meta: {
            requiresAuth: true
        }
    },
    {
        path: "/register",
        component: RegisterView,
        name: 'registration'
    }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token');
    const isAuthenticated = isTokenValid(token);

    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!isAuthenticated) {
            next({
                path: '/login',
                query: { redirect: to.fullPath }
            });
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;
