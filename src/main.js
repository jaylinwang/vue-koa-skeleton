import Vue from 'vue'
import App from './App.vue'

console.dir(process.env.NODE_ENV)
const app = new Vue({
  components: {
    App
  },
  render (h) {
    return (
      <app></app>
    )
  }
})
app.$mount('#root')
