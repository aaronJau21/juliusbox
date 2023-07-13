import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from './stores/auth';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'login',
            component: () => import('./views/auth/Login.vue')
        },
        {
            path: '/links',
            name: 'links',
            component: () => import('./views/dashboard/links/Links.vue'),
            meta: {
                auth: true
            }
        },
        {
            path: '/notas',
            name: 'notas',
            component: () => import('./views/dashboard/notas/Notas.vue'),
            meta: {
                auth: true
            }
        },
    ]
})

router.beforeEach((to, _from, next) => {

    const authStore = useAuthStore()

    if (to.meta?.auth) {
        const token = authStore.token;
        if (token) {
            next()
        } else {
            next({ name: 'login' })
        }
    } else {
        next()
    }
})

export default router