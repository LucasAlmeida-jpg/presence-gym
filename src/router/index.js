import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProfessorView from '../views/ProfessorView.vue'
import UserView from '../views/UserView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/professor',
      name: 'professor',
      component: ProfessorView
    },
    {
      path: '/user',
      name: 'user',
      component: UserView
    },
   ]
})

export default router