import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  // adicionar outras rotas aqui, ex: { path: '/portfolio', name: 'Portfolio', component: () => import('../views/Portfolio.vue') }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
