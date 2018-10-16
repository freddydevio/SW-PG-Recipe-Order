import Vue from 'vue'
import Router from 'vue-router'

import checkout from '../components/checkout/'
import product from '../components/product/'
import recipe from '../components/recipe/'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'product',
            component: product,
        }, {
            path: '/checkout',
            name: 'checkout',
            component: checkout,
        }, {
            path: '/recipe',
            name: 'recipe',
            component: recipe,
        }
    ]
})
