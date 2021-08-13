<template>
  <main>
    <location-page-head></location-page-head>
    <location-page-hourly-forecast></location-page-hourly-forecast>
    <location-page-weekly-forecast></location-page-weekly-forecast>
  </main>
</template>

<script>
import locationPageHead from "../components/locationPage-head.vue";
import locationPageHourlyForecast from "../components/locationPage-hourlyforecast.vue";
import locationPageWeeklyForecast from "../components/locationPage-weeklyforecast.vue";
export default {
  name: "App",
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
