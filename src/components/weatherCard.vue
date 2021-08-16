<template>
  <router-link to="/location">
    <div class="comp__card">
      <div class="card__city">
        {{ cityName }}
      </div>
      <div class="card__city-info">
        <img class="city-info__img" v-if="cityWeather === 'broken clouds'" src="@/assets/img/cloudy.svg" />
        <img class="city-info__img" v-if="cityWeather === 'sunny'" src="@/assets/img/day.svg" />
        <img class="city-info__img" v-if="cityWeather === 'light intensity shower rain'" src="@/assets/img/rainy-6.svg" />
        {{ cityTemp }}°
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  props: ['cityName', 'cityTemp', 'cityWeather'],
  name: 'App',
};
</script>

<style></style>
