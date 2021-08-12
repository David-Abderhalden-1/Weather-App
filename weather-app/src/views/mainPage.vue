<template>
  <div class="mainPage">
    <div class="mainPage__container">
      <input
        class="mainPage__container__searchbar"
        type="text"
        placeholder="Search"
      />
      <button
        class="mainPage__container__editBtn"
        v-if="!inSearch"
        @click="inSearch = true"
      >
        Edit
      </button>
      <button
        class="mainPage__container__addBtn"
        v-if="inSearch"
        @click="inSearch = false"
      >
        Add
      </button>
    </div>
    <div class="mainPage__card">
      <p>placeholder div</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      inSearch: false,
    };
  },
};
</script>

<style>
@import '../assets/view-mainPage.css';
</style>
