import { createRouter, createWebHistory } from 'vue-router'
import mainPage from '../views/mainPage.vue'

const routes = [{
        path: '/',
        name: 'Home',
        component: mainPage
    },
    {
        path: '/location/:id',
        name: 'Location',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/locationPage.vue')
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router