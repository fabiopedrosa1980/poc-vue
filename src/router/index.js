import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login'
import Cliente from '../components/Cliente'

Vue.use(Router)

export default new Router({
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
    
  ]
})
