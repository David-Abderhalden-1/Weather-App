<template>
  <div>
    <p>mainpage</p>
    <!-- FOR TESTING. REMOVE BEFORE DEPLOYMENT -->
    <button @click="testLogWeatherApiBuild" />
    <input v-model="input" />
    <button @click="testLogLocationApiBuild" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "App",

  data() {
    return {
      input: null,
    };
  },

  computed: {
    ...mapGetters({
      weatherApi: "getWeatherApi",
      locationApi: "getLocationApi",
    }),
  },

  methods: {
    // FOR TESTING
    testLogWeatherApiBuild() {
      this.$store.commit({
        type: "createWeatherAPI",
        lat: "47.376888",
        lon: "8.541694",
        include: "daily",
      });
      console.log(this.weatherApi);
    },

    testLogLocationApiBuild() {
      this.$store.commit({
        type: "createLocationAPI",
        input: this.input,
      });
      console.log(this.locationApi);
    },
  },
};
</script>

<style>
</style>
