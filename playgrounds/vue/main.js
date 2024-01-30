import Vue from 'vue'
import App from './App.vue'
import '@danzf/bwi-design/css/jds-design-system.css'

/** 
 * register all components globally using Plugin
 */ 
import { DesignSystem } from '@danzf/bwi-design/esm'
Vue.use(DesignSystem)

/**
 * register component ala carte
 */
// import { Button } from '@danzf/bwi-design/esm'
// Vue.component('JdsButton', Button)
// Vue.component('JdsInputText', InputText)

new Vue({
  el: '#app',
  render: (h) => h(App),
}).$mount('#app')
