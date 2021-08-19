<template>
  <router-link :to="{path: '/location/' + index}">
    <div class="comp__card">
      <div class="card__city">
        {{ shortCityName }}
      </div>
      <div class="card__city-info">
        <p v-if="card.weatherId == undefined">Bad Request</p>
        <icon-component :iconId="card.weatherId" :divClass="''" :imgClass="'city-info__img'"/>
        <p v-if="card.weatherId != undefined">{{ card.temp }}°</p>
      </div>
    </div>
  </router-link>
</template>

<script>
import iconComponent from './weather-icon.vue'

export default {
  components: {
    iconComponent,
  },

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
