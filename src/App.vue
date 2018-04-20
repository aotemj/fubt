<template>
  <div id="app">
    <router-view/>
    <Footer></Footer>
  </div>
</template>

<script>
  import Footer from './components/footer'

  export default {
    name: 'App',
    data() {
      return {}
    },
    methods: {},
    created() {

    },
    computed: {},
    components: {
      Footer
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #fff;
    background-color: #1e253d;
    overflow-x: auto;
  }
</style>
