import { createRouter, createWebHistory } from 'vue-router'

import LandingPage from '@/components/LandingPage.vue'
import Login from '@/components/Login.vue'
import HomePage from '@/components/HomePage.vue'
import SignUp from '@/components/SignUp.vue'
import ProfilePage from '@/components/ProfilePage.vue'
import FarmersPage from '@/components/FarmersPage.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: LandingPage
    },
    {
      path: '/login',
      component: Login  
    },
    {
      path:'/homepage',
      component: HomePage
    },
    {
      path:'/signup',
      component: SignUp
    },
    {
      path:'/profile',
      component: ProfilePage
    },
    {
      path:'/farmers',
      component: FarmersPage
    }
  
  ],
})

export default router
