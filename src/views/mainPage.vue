<template>
  <div class="mainPage">
    <div class="mainPage__container">
      <input
        list="locations"
        class="mainPage__container__searchbar"
        type="text"
        placeholder="Search"
        v-model="input"
        @keypress.enter="addCard"
      />
      <div style="z-index: 99; position: fixed; background: white; width: 24%;">
        <p v-for="(element, index) in activeResults" :key="index" 
        @click="selectElement(index)"
        style="border: 1px solid black;"
        >
          {{ element.formatted }}
        </p>
      </div>
      <!--datalist id="locations">
        <option v-for="(element, index) in searchResult" :key="index">
          {{ element.formatted }}
        </option>
      </datalist-->
      <button 
      @click="addCard"
      >Add</button>
    </div>
    <div>
      <div class="mainPage__card" v-for="(card, index) in cards" :key="index">
        <p>{{ card.title }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { locationApi } from "../instances";

export default {
  name: "App",

  data() {
    return {
      input: "",
    };
  },

  computed: {
    ...mapGetters({
      searchResult: "getSearchLocationResponse",
      cards: "getCards",
    }),
    activeResults(){
      if(this.input != ''){
        return this.searchResult
      }
      return null
    }
  },

  watch: {
    input() {
      if (this.input.length > 2) {
        this.sendRequest();
      }
    },
  },

  methods: {
    // FOR TESTING
    sendRequest() {
      locationApi({ params: { q: this.input } }).then((response) => {
        this.$store.commit({
          type: "storeSearchResult",
          results: response.data.results,
        });
      });
    },
    addCard() {
      this.$store.commit({
        type: "addCard",
      });
      this.input = ''
    },
    selectElement(index){
      this.input = this.searchResult[index].formatted
    }
  },
};
</script>

<style>
@import "../assets/view-mainPage.css";
</style>
