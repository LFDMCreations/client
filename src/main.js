import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import './style.css'
import App from './App.vue'
import Home from './views/Home.vue'
import Deux from './views/Deux.vue'
import NotFound from './views/NotFound.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
    { path: '/', name: 'Home', component: Home },
    { path: '/deux', name: 'Deux', component: Deux },
   //{ path: '/', name: 'home', component: Home },
  ]
})


createApp(App)
.use(router)
.mount('#app')
