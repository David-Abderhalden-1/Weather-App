<template>
  <div class="mainPage">
    <div class="mainPage__container">
      <input
        class="mainPage__container__searchbar"
        type="text"
        placeholder="Search"
      />
      <button
        class="mainPage__container__editBtn"
        v-if="!inSearch"
        @click="inSearch = true"
      >
        Edit
      </button>
      <button
        class="mainPage__container__addBtn"
        v-if="inSearch"
        @click="inSearch = false"
      >
        Add
      </button>
    </div>
    <div class="mainPage__card">
      <p>placeholder div</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "App",

  data() {
    return {
      input: null,
      inSearch: false,
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
@import '../assets/view-mainPage.css';
</style>
