<template>
  <router-link to="/location">
    <div class="comp__card">
      <div class="card__city">
        {{ cityName }}
      </div>
      <div class="card__city-info">
        <p v-if="weatherId == undefined">Bad Request</p>
        <img class="city-info__img" v-if="weatherId == 804" src="@/assets/img/cloudy.svg" />
        <img class="city-info__img" v-if="weatherId < 804 && weatherId > 800" src="@/assets/img/cloudy-day-3.svg" />
        <img class="city-info__img" v-if="weatherId == 800" src="@/assets/img/day.svg" />
        <img class="city-info__img" v-if="weatherId < 532 && weatherId > 500" src="@/assets/img/rainy-6.svg" />
        <img class="city-info__img" v-if="weatherId == 500" src="@/assets/img/rainy-day.svg" />
        <img class="city-info__img" v-if="(weatherId < 603 && weatherId > 599) || (weatherId < 623 && weatherId > 619)" src="@/assets/img/snowy-6.svg" />
        <img class="city-info__img" v-if="weatherId < 617 && weatherId > 610" src="@/assets/img/snowy-day.svg" />
        <img class="city-info__img" v-if="weatherId < 233 && weatherId > 199" src="@/assets/img/thunder.svg" />
        <p v-if="weatherId != undefined">{{ cityTemp }}°</p>
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
