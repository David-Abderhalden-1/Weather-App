<template>
  <article class="locationandtemperaturesector">
    <h1 class="h1location">{{ title }}</h1>
    <h2 class="h2temperature">Aktuell {{ currentTemperature }}°</h2>
  </article>
</template>

<script>
export default {
  name: "locationPage-head",
  props: ["title", "currentTemperature"]
};
</script>

<style>
</style>