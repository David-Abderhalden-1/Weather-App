<template>
  <div class="main-page">
    <div class="main-page__container">
      <input class="container__searchbar" type="text" placeholder="Search" v-model="input" />
      <button
        class="container__edit-btn"
        v-if="input == ''"
        @click="inEdit = !inEdit"
      >
        Edit
      </button>
      <button
        class="container__add-btn"
        v-if="input != ''"
        @click="inSearch = false"
      >
        Add
      </button>
    </div>
    <div class="main-page__container2">
        <div class="conteiner2__city-loop" v-for="(city, index) in cities" :key="index">
          <weather-card class="city-loop__comp" :cityName="city.name" :cityTemp="city.temperature" :cityWeather="city.weather"></weather-card>
          <button v-if="inEdit" @click="deleteCard" class="city-loop__del-btn">--</button>
        </div>
    </div>
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
      input: "",
      inSearch: false,
      inEdit: false
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
    deleteCard(index) {
      console.log('lol');
    }
  },
};
</script>

<style>
@import '../assets/view-mainPage.css';
</style>
