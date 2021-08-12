<template>
 <p>mainpage</p>
 <!-- FOR TESTING. REMOVE BEFORE DEPLOYMENT -->
 <button @click="testLogApiBuild"/>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'App',

  computed: {
    ...mapGetters({
      api: 'getApi',
    })
  },

  methods: {
    // FOR TESTING
    testLogApiBuild() {
      this.$store.commit({
        type: 'createAPI',
        lat: '47.376888',
        lon: '8.541694',
        exclude: 'minutely,hourly,current',
      })
      console.log(this.api)
    }
  }
}
</script>

<style>
</style>
