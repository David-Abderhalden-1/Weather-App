<template>
  <router-link to="/Location">
    <div class="comp__card">
      <div class="card__city">
        {{ cityName }}
      </div>
      <div class="card__city-info">
        <img class="city-info__img" v-if="weatherId == 804" src="@/assets/img/cloudy.svg" />
        <img class="city-info__img" v-if="800 < weatherId < 804" src="@/assets/img/cloudy-day-3.svg" />
        <img class="city-info__img" v-if="weatherId == 800" src="@/assets/img/day.svg" />
        <img class="city-info__img" v-if="500 < weatherId < 532" src="@/assets/img/rainy-6.svg" />
        <img class="city-info__img" v-if="weatherId == 500" src="@/assets/img/rainy-day.svg" />
        <img class="city-info__img" v-if="599 < weatherId < 603 || 619 < weatherId < 623 " src="@/assets/img/snowy-6.svg" />
        <img class="city-info__img" v-if="610 < weatherId < 617" src="@/assets/img/snowy-day.svg" />
        <img class="city-info__img" v-if="199 < weatherId < 233" src="@/assets/img/thunder.svg" />
        {{ cityTemp }}°
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  props: ['cityName', 'cityTemp', 'weatherId'],
  name: 'App',
};
</script>

<style></style>
