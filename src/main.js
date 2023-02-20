import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import Home from './views/Home.vue'
import Deux from './views/Deux.vue'
import Car from './views/Car.vue'
import NotFound from './views/NotFound.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
    { path: '/', name: 'Home', component: Home },
    { path: '/car/:id', name: 'Car', component: Car },
    { path: '/deux', name: 'Deux', component: Deux },
   //{ path: '/', name: 'home', component: Home },
  ]
})


createApp(App)
.use(createPinia())
.use(router)
.mount('#app')
