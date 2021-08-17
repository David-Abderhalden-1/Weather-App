<template>
  <main class="main">
    <location-page-head
      :title="currentCard.title"
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
import { locationApi, weatherApi } from "../instances";
export default {
  name: "App",

  beforeCreate() {
    this.$store.commit("setCurrentCard", { cardId: this.$route.params.id });
  },

  mounted() {
    this.getHourlyData();
    this.getCurrentData();
    this.getWeeklyData();
  },

  data() {
    return {
      currentTemperature: null,
      weekDays: [
        "Sonntag",
        "Montag",
        "Dienstag",
        "Mittwoch",
        "Donnerstag",
        "Freitag",
        "Sammstag",
      ],
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
        data.forEach((el) => {
          let newHourlyEntity = {
            hour: this.getFormatedTime(el.dt),
            temp: el.temp.toFixed(1),
          };
          this.hourlyForecast.push(newHourlyEntity);
        });
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
            day: this.getWeekdayByIndex(index),
            max: el.temp.max.toFixed(0),
            min: el.temp.min.toFixed(0),
          };
          this.weeklyForecast.push(newWeeklyEntity);
        });
      });
    },

    getFormatedTime(unixTime) {
      let date = new Date(unixTime * 1000);
      let hours = date.getHours();
      let minutes = "0" + date.getMinutes();
      return hours + ":" + minutes.substr(-2);
    },

    getWeekdayByIndex(apivalueindex) {
      let today = new Date().getDay();
      let weeklyindex = today + apivalueindex
      if(apivalueindex == 0){
        return 'Heute'
      }
      if(weeklyindex>= 7){
        weeklyindex = weeklyindex -7
      }
      return this.weekDays[weeklyindex];
    },
  },

  computed: {
    ...mapGetters({
      currentCard: "getCurrentCard",
    }),
  },
  components: {
    locationPageHead,
    locationPageHourlyForecast,
    locationPageWeeklyForecast,
  },
};
</script>

<style>
@import "../assets/view-locationPage.css";
</style>
