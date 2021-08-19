<template>
  <main class="main">
    <location-page-head
      :title="splitTitle"
      :currentTemperature="currentCard.temp.toFixed(2)"
      :refreshData="updateData"
    ></location-page-head>
    <location-page-hourly-forecast
      :hourlyForecast="currentCard.hourly"
    ></location-page-hourly-forecast>
    <location-page-weekly-forecast
      :weeklyForecast="currentCard.weekly"
    ></location-page-weekly-forecast>
  </main>
</template>

<script>
import locationPageHead from "../components/locationPage-head.vue";
import locationPageHourlyForecast from "../components/locationPage-hourlyforecast.vue";
import locationPageWeeklyForecast from "../components/locationPage-weeklyforecast.vue";
import { mapGetters } from "vuex";
import { splitName, shortenName } from "../globalFunctions";
import "../swiped-events.js";

export default {
  name: "App",

  components: {
    locationPageHead,
    locationPageHourlyForecast,
    locationPageWeeklyForecast,
  },

  beforeMount() {
    this.cardIndex = this.$route.params.id;
    this.currentCard = this.cards[this.cardIndex];
    if (this.currentCard == null) {
      window.location.href = "/";
    }
  },

  mounted() {
    if(this.currentCard.weekly.length == 0 || this.currentCard.hourly.length == 0){
          this.updateData()
    }
  },

  computed: {
    ...mapGetters({
      cards: "getCards",
    }),

    splitTitle() {
      let array = splitName(this.currentCard.title);
      let title = shortenName(array[0], 15);
      let subtitle = shortenName(array[1], 20);
      return [title, subtitle];
    },
  },

  data() {
    return {
      cardIndex: 0,
      currentCard: null,
    };
  },

  methods: {
    updateData() {
      this.$store.commit({
        type: "updateData",
        cardIndex: this.cardIndex,
      });
    },
  },
};
</script>

<style>
@import "../assets/view-locationPage.css";
</style>
