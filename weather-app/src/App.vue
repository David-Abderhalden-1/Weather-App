<template>
  <p> {{ test }} </p>
  
</template>

<script>
//import mainPage from './components/mainPage.vue'
//import locationPage from './components/locationPage.vue'

export default {
  name: 'App',
  components: {
    //mainPage,
    //locationPage
  },
  computed: {
    test() {
      return this.$store.state.test
    }
  }

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
