<template>
  <div class="mainPage">
    <div class="mainPage__container">
      <input
        list="locations"
        class="mainPage__container__searchbar"
        type="text"
        placeholder="Search"
        v-model="input"
      />
      <button
        @click="addCard"
      >
        Add
      </button>
    </div>
    <div class="mainPage__card">
      <p>placeholder div</p>
    </div>
    <!-- REMOVE BEFORE MERGE -->
    <datalist id="locations" style="height: 20px; width: 40px;">
      <option v-for="(element, index) in searchResult" :key="index">{{element.formatted}}</option>
    </datalist>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { locationApi } from "../instances";

export default {
  name: "App",

  data() {
    return {
      input: '',
    };
  },

  computed: {
    ...mapGetters({
      searchResult: "getSearchLocationResponse",
      cards: "getCards"
    }),
  },

  watch: {
    input() {
      if(this.input.length > 2){
        this.sendRequest()
      }
    }
  },

  methods: {
    // FOR TESTING
    sendRequest(){
      locationApi({params: {q: this.input}})
      .then((response) => {
        this.$store.commit({
          type: "storeSearchResult",
          results: response.data.results,
        })
      })
    },
    addCard() {
      this.$store.commit({
        type: 'addCard',
      })
    }
  },
};
</script>

<style>
@import '../assets/view-mainPage.css';
</style>
