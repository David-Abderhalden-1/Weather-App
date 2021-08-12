import { createApp } from 'vue'
import App from './App.vue'
import { store } from './store/index'

import { createRouter, createWebHistory } from 'vue-router'
import MainPage from './components/mainPage'
import LocationPage from './components/locationPage'

const routes = [
  { path:'/', component: MainPage},
  { path:'/location', component: LocationPage} // stadt in pfad evt
]

const app = createApp(App)

app.use(store)


const router = createRouter({
  history: createWebHistory(),
  routes
})

app.use(router)

app.mount('#app')
