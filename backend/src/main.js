import Vue from 'vue'
import Router from 'vue-router'
import App from './App.vue'
import './assets/css/variables.scss';

import Main from './components/Main.vue'
import Products from './components/Products.vue'
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
                path: '/products',
                name: 'products',
                component: Products,
            },
            {
                path: '/product/:id',
                name: 'product',
                component: Product,
            },
        ]
    }
)

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
