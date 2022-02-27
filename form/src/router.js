import { createWebHistory, createRouter } from 'vue-router'
import store from "./store";
import Main from '@/components/Main'
import Register from '@/components/Register'
import Cabinet from '@/components/Cabinet'

export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: Main
        },
        {
            path: '/register',
            component: Register,
            beforeEnter: ifNotAuthenticated,
        },
        {
            path: '/cabinet',
            component: Cabinet,
            beforeEnter: ifAuthenticated,
        }
    ]
});

const ifNotAuthenticated = (to, from, next) => {
    if (!store.getters.loggedIn) {
        next();
        return;
    }
    next("/");
};

const ifAuthenticated = (to, from, next) => {
    if (store.getters.loggedIn) {
        next();
        return;
    }
    next("/login");
};