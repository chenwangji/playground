<template>
  <div id="app">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <input type="text" v-model="text" >
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  provide() {
    return {
      job: this.bar
    }
  },
  data() {
    return {
      text: '',
      bar: {
        baz: ''
      }
    }
  },
  components: {
    HelloWorld
  },
  created() {
    this.$watch(() => this.$data, {
      deep: true,
      handler(v) { this.bar.baz = v; console.log('watch!') }
    })
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
