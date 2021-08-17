<template>
  <article class="hourlyforecast">
      <ul class="hourlyforecast__forecastlist">
       <location-page-hourlyforecast-element></location-page-hourlyforecast-element>
      </ul>
    </article>
</template>

<script>
import locationPageHourlyforecastElement from '../components/locationPage-hourlyforecast-element.vue'; 
export default {
  components: { locationPageHourlyforecastElement },
    name: 'locationPage-hourlyforecast',
}
</script>

<style>

</style>