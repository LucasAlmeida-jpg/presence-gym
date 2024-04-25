import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProfessorView from '../views/ProfessorView.vue'
import UserView from '../views/UserView.vue'
import CadastroView from '../views/CadastroView.vue'
import HistoricoView from '../views/HistoricoView.vue'; 
import GraduacaoView from '../views/GraduacaoView.vue'; 
import AlunosView from '../views/AlunosView.vue'; 
import ConfigView from '../views/Alunos/ConfigView.vue'; 

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
    {
      path: '/cadastro',
      name: 'cadastro',
      component: CadastroView
    },
    {
      path: '/Historico',
      name: 'Historico',
      component: HistoricoView
    },
    {
      path: '/Graduacao',
      name: 'Graduacao',
      component: GraduacaoView
    },
    {
      path: '/Alunos',
      name: 'Alunos',
      component: AlunosView
    },
    {
      path: '/Configuracoes',
      name: 'Configuracoes',
      component: ConfigView
    }
   ]
})

export default router
