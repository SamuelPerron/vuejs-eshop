<template>
    <div id="app">
        <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">

        <Menu/>
        <router-view/>
    </div>
</template>

<script>
import './assets/css/main.scss';

import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
import AOS from 'aos'
import 'aos/dist/aos.css'

import Menu from './components/Menu.vue'

export default {
    name: 'App',
    components: {
        Menu,
    },
    created() {
        AOS.init();
    }
}
</script>
