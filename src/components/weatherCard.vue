<template>
  <router-link to="/location">
    <div class="comp__card">
      <div class="card__city">
        {{ name }}
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

  created(){
    if(this.cityName.length > 30){
      this.name = this.cityName.slice(0, 30) + '...';
    }else {
      this.name = this.cityName;
    }
  }
};
</script>

<style></style>
