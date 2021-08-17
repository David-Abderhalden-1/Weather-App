<template>
  <li class="forecastlist__forecastlistelement">
    <p class="forecastlistelement__textcontent textcontent__modifier">{{hourlyValue.hour}}</p>
    <p class="forecastlistelement__textcontent">{{hourlyValue.temp}}°</p>
  </li>
</template>

<script>
export default {
    name: 'locationPage-hourlyforecast-element',
    props: {
        hourlyValue:Object
    }
};
</script>

<style>
</style>