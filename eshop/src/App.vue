<template>
  <div id="app">
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
import Menu from './components/Menu.vue'

export default {
  name: 'App',
  components: {
      Menu
  }
}
</script>
