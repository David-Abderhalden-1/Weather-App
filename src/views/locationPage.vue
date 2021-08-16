<template>
  <main>
    <location-page-head :title="currentCard.title"></location-page-head>
    <location-page-hourly-forecast></location-page-hourly-forecast>
    <location-page-weekly-forecast></location-page-weekly-forecast>
  </main>
</template>

<script>
import locationPageHead from "../components/locationPage-head.vue";
import locationPageHourlyForecast from "../components/locationPage-hourlyforecast.vue";
import locationPageWeeklyForecast from "../components/locationPage-weeklyforecast.vue";
import { mapGetters } from 'vuex'
export default {
  name: "App",

  beforeCreate() {
    this.$store.commit("setCurrentCard", { cardId: this.$route.params.id }); 
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
