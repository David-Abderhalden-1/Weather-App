<template>
  <article class="locationandtemperaturesector">
    <div style="display: flex; flex-direction: column; align-items: center;">
      <h1 class="h1location">{{ title[0] }}</h1>
      <h3 v-if="title[1] != undefined" class="h3location">{{ title[1] }}</h3>
    </div>
    <h2 class="h2temperature">Aktuell {{ currentTemperature }}°</h2>
  </article>
</template>

<script>
export default {
  name: "locationPage-head",
  props: {
    title: Array,
    currentTemperature: String,
  },
};
</script>

<style>
</style>