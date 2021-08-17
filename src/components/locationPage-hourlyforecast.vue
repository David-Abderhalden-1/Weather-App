<template>
  <article class="hourlyforecast">
    <ul class="hourlyforecast__forecastlist">
      <location-page-hourlyforecast-element
        v-for="(hourly, index) in hourlyForecast"
        :key="index" :hourlyValue="hourly"
      ></location-page-hourlyforecast-element>
    </ul>
  </article>
</template>

<script>
import locationPageHourlyforecastElement from "../components/locationPage-hourlyforecast-element.vue";
export default {
  components: { locationPageHourlyforecastElement },
  name: "locationPage-hourlyforecast",
  props: { hourlyForecast: Array },
};
</script>

<style>
</style>