<template>
  <article class="weeklyforecast">
      <table class="weeklyforecast__weeklytable">
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th class="weeklyrowentity__tableheader">Max</th>
            <th class="weeklyrowentity__tableheader">Min</th>
          </tr>
        </thead>
        <tbody>
          <location-page-weeklyforecast-element v-for="(daily, index) in weeklyForecast"
        :key="index" :dailyValue="daily"></location-page-weeklyforecast-element>
        </tbody>
      </table>
    </article>
</template>

<script>
import locationPageWeeklyforecastElement from '../components/locationPage-weeklyforecast-element.vue';
export default {
  components: { locationPageWeeklyforecastElement },
    name: 'locationPage-weeklyforecast',
    props: {
      weeklyForecast:Object
    }
}
</script>

<style>

</style>