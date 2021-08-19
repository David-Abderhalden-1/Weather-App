<template>
  <article class="main__head">
    <div class="head__buttons">
      <button class="buttons__button" @click="goBack">&lt;</button>
      <button class="buttons__button" @click="refreshData"><img src="@/assets/img/refresh-icon.svg"/></button>
    </div>
    <div
      class="head__title"
      style="display: flex; flex-direction: column; align-items: center"
    >
      <h1 class="title__main-title">{{ title[0] }}</h1>
      <h3 v-if="title[1] != undefined" class="title__sub-title">
        {{ title[1] }}
      </h3>
    </div>
    <h2 class="head__temperature">Aktuell: {{ currentTemperature }}°</h2>
  </article>
</template>

<script>
export default {
  name: "locationPage-head",
  props: {
    title: Array,
    currentTemperature: String,
    refreshData: Function,
  },
  methods: {
    goBack() {
      window.location.href = "/";
    },
  },
};
</script>

<style>
</style>