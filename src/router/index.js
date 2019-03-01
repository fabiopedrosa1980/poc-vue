import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login'
import Cliente from '../components/Cliente'
import PageNotFound from '../components/PageNotFound'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/cliente',
      name: 'Cliente',
      component: Cliente
    },
    {
      path: '*',
      name: 'PageNotFound',
      component: PageNotFound
    },
    
  ]
})
