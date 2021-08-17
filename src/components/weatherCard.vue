<template>
  <router-link to="/location">
    <div class="comp__card">
      <div class="card__city">
        {{ shortCityName }}
      </div>
      <div class="card__city-info">
        <img class="city-info__img" src="@/assets/img/day.svg" />
        {{ cityTemp }}°
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  props: ['cityName', 'cityTemp', 'cityWeather'],
  name: 'App',
  data() {
    return {
      name: ''
    }
  },

  computed: {
    shortCityName() {
      return this.cityName.length > 30 ? this.cityName.slice(0, 30) + '...' : this.cityName;
    }
  }
};
</script>

<style></style>
