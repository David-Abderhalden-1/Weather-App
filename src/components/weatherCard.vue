<template>
  <router-link :to="{path: '/location/' + index}">
    <div class="comp__card">
      <div class="card__city">
        {{ shortCityName }}
      </div>
      <div class="card__city-info">
        <p v-if="card.weatherId == undefined">Bad Request</p>
        <img class="city-info__img" v-if="card.weatherId == 804" src="@/assets/img/cloudy.svg" />
        <img class="city-info__img" v-if="card.weatherId < 804 && card.weatherId > 800" src="@/assets/img/cloudy-day-3.svg" />
        <img class="city-info__img" v-if="card.weatherId == 800" src="@/assets/img/day.svg" />
        <img class="city-info__img" v-if="card.weatherId < 532 && card.weatherId > 500" src="@/assets/img/rainy-6.svg" />
        <img class="city-info__img" v-if="card.weatherId == 500" src="@/assets/img/rainy-day.svg" />
        <img class="city-info__img" v-if="(card.weatherId < 603 && card.weatherId > 599) || (card.weatherId < 623 && card.weatherId > 619)" src="@/assets/img/snowy-6.svg" />
        <img class="city-info__img" v-if="card.weatherId < 617 && card.weatherId > 610" src="@/assets/img/snowy-day.svg" />
        <img class="city-info__img" v-if="card.weatherId < 233 && card.weatherId > 199" src="@/assets/img/thunder.svg" />
        <p v-if="card.weatherId != undefined">{{ card.temp }}°</p>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    card: Object,
    index: Number,
  },

  name: 'App',
  data() {
    return {
      name: ''
    }
  },

  computed: {
    shortCityName() {
      return this.card.title.length > 30 ? this.card.title.slice(0, 30) + '...' : this.card.title;
    }
  }
};
</script>

<style></style>
