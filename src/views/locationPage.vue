<template>
  <main>
    <location-page-head
      :title="currentCard.title"
      :currentTemperature="currentTemperature"
    ></location-page-head>
    <location-page-hourly-forecast></location-page-hourly-forecast>
    <location-page-weekly-forecast></location-page-weekly-forecast>
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
  },

  data() {
    return {
      currentTemperature: null,
      hourlyForecast: [],
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
        //console.log(this.getFormatedTime(response.data.hourly[0].dt));
        data.forEach((el) => {
          let newHourlyEntity = {
            hour: this.getFormatedTime(el.dt),
            temp: (el.temp - 273.15).toFixed(0),
          };
          this.hourlyForecast.push(newHourlyEntity)
          console.log(this.hourlyForecast)
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
        this.currentTemperature = (response.data.current.temp - 273.15).toFixed(
          2
        );
      });
    },

    getFormatedTime(unixTime) {
      let date = new Date(unixTime * 1000);
      let hours = date.getHours();
      let minutes = "0" + date.getMinutes();
      return hours + ":" + minutes.substr(-2);
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
