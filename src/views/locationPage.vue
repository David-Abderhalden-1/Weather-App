<template>
  <main class="main">
    <location-page-head
      :title="splitTitle"
      :currentTemperature="currentTemperature"
    ></location-page-head>
    <location-page-hourly-forecast
      :hourlyForecast="hourlyForecast"
    ></location-page-hourly-forecast>
    <location-page-weekly-forecast
      :weeklyForecast="weeklyForecast"
    ></location-page-weekly-forecast>
  </main>
</template>

<script>
import locationPageHead from "../components/locationPage-head.vue";
import locationPageHourlyForecast from "../components/locationPage-hourlyforecast.vue";
import locationPageWeeklyForecast from "../components/locationPage-weeklyforecast.vue";
import { mapGetters } from "vuex";
import { weatherApi } from "../instances";
import { getFormatedTime, getDayByIndex, splitName, shortenName } from "../globalFunctions"

export default {
  name: "App",

  components: {
    locationPageHead,
    locationPageHourlyForecast,
    locationPageWeeklyForecast,
  },

  beforeMount() {
    this.currentCard = this.cards[this.$route.params.id];
  },

  mounted() {
    this.getHourlyData();
    this.getCurrentData();
    this.getWeeklyData();
  },

  computed: {
    ...mapGetters({
      cards: "getCards",
    }),

    splitTitle() {
      let array = splitName(this.currentCard.title)
      let title = shortenName(array[0], 15)
      let subtitle = shortenName(array[1], 20)
      return [title, subtitle]
    },
  },

  data() {
    return {
      currentCard: null,
      currentTemperature: null,
      hourlyForecast: [],
      weeklyForecast: [],
    };
  },

  methods: {
    getHourlyData() {
      weatherApi({
        params: {
          lat: this.currentCard.lat,
          lon: this.currentCard.lng,
          exclude: "daily,minutely,current",
        },
      }).then((response) => {
        let data = response.data.hourly;
        for (let i = 0; i < 24; i++) {
          let newHourlyEntity = {
            hour: getFormatedTime(data[i].dt),
            temp: data[i].temp.toFixed(1),
          };
          this.hourlyForecast.push(newHourlyEntity)
        }
      });
    },

    getCurrentData() {
      weatherApi({
        params: {
          lat: this.currentCard.lat,
          lon: this.currentCard.lng,
          exclude: "hourly,daily,minutely",
        },
      }).then((response) => {
        this.currentTemperature = response.data.current.temp.toFixed(2);
      });
    },

    getWeeklyData() {
      weatherApi({
        params: {
          lat: this.currentCard.lat,
          lon: this.currentCard.lng,
          exclude: "hourly,minutely,current",
        },
      }).then((response) => {
        console.log(response.data.daily);
        let data = response.data.daily;
        data.forEach((el, index) => {
          let newWeeklyEntity = {
            day: getDayByIndex(index),
            max: el.temp.max.toFixed(0),
            min: el.temp.min.toFixed(0),
          };
          this.weeklyForecast.push(newWeeklyEntity);
        });
      });
    },
  },
};
</script>

<style>
@import "../assets/view-locationPage.css";
</style>
