
const Vue = window.Vue
Vue.component('hello-world', {
  template: `
    
  `,
  data() {
    return {
      word: 'hello world!',
    }
  },
})

function initial() {
  new Vue({
    el: '#app',
  })
}

initial()