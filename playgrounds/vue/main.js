import '@danzf/bwi-design/css/bwi-design-system.css'
import Vue from 'vue'
import App from './App.vue'

/** 
 * register all components globally using Plugin
 */ 
import { DesignSystem } from '@danzf/bwi-design/esm'
Vue.use(DesignSystem)

/**
 * register component ala carte
 */
// import { Button } from '@danzf/bwi-design/esm'
// Vue.component('BwiButton', Button)
// Vue.component('BwiInputText', InputText)

new Vue({
  el: '#app',
  render: (h) => h(App),
}).$mount('#app')
