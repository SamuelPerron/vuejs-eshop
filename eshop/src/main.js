import Vue from 'vue'
import Router from 'vue-router'
import App from './App.vue'
import { makeServer } from './server'
import './assets/css/variables.scss';

import Main from './components/Main.vue'
import Explore from './components/Explore.vue'
import Product from './components/Product.vue'

Vue.use(Router)

Vue.config.productionTip = false

const router = new Router(
    {
        routes: [
            {
                path: '/',
                name: 'home',
                component: Main,
            },
            {
                path: '/explore',
                name: 'explore',
                component: Explore,
            },
            {
                path: '/product/:id',
                name: 'product',
                component: Product,
            },
        ]
    }
)

if (process.env.NODE_ENV === 'development') {
    makeServer()
}

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
