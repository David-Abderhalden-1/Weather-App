<template>
  <div class="main-page">
    <div class="main-page__container">
      <input class="container__searchbar" type="text" placeholder="Search" />
      <button
        class="container__edit-btn"
        v-if="!inSearch"
        @click="inSearch = true"
      >
        Edit
      </button>
      <button
        class="container__add-btn"
        v-if="inSearch"
        @click="inSearch = false"
      >
        Add
      </button>
    </div>
    <router-link to="/Location">
      <div class="main-page__card" v-for="city in cities" :key="city.name">
        <weather-card :cityName="city.name" :cityTemp="city.temperature" :cityWeather="city.weather"></weather-card>
      </div>
    </router-link>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import weatherCard from '@/components/weatherCard.vue';

export default {
  components: { weatherCard },
  name: 'App',

  data() {
    return {
      input: null,
      inSearch: false,
    };
  },

  computed: {
    ...mapGetters({
      weatherApi: 'getWeatherApi',
      locationApi: 'getLocationApi',
      cities: 'getCities'
    }),
  },

  methods: {
    // FOR TESTING
    testLogWeatherApiBuild() {
      this.$store.commit({
        type: 'createWeatherAPI',
        lat: '47.376888',
        lon: '8.541694',
        include: 'daily',
      });
      console.log(this.weatherApi);
    },

    testLogLocationApiBuild() {
      this.$store.commit({
        type: 'createLocationAPI',
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
