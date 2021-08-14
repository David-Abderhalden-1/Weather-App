<template>
  <div class="mainPage">
    <div class="mainPage__container">
      <input
        list="locations"
        class="container__searchbar"
        type="text"
        placeholder="Search"
        v-model="input"
        @keypress.enter="addCard"
      />
      <div class="container__dropdown">
        <p
          class="dropdown__text"
          v-for="(element, index) in activeResults"
          :key="index"
          @click="selectElement(index)"
          v-html="highlight(element)"
        ></p>
      </div>
      <!--datalist id="locations">
        <option v-for="(element, index) in searchResult" :key="index">
          {{ element.formatted }}
        </option>
      </datalist-->
      <button @click="addCard">Add</button>
    </div>
    <div>
      <div class="mainPage__card" v-for="(card, index) in cards" :key="index">
        <p>{{ card.title }}</p>
        <p></p>
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
      input: "",    // linked to inpput field
    };
  },

  computed: {
    // data from store
    ...mapGetters({
      searchResult: "getSearchLocationResponse",    // api search data
      cards: "getCards",                            // all cards
    }),
    // prevent dropdown if no input
    activeResults() {
      if (this.input != "") {
        return this.searchResult;
      }
      return null;
    },
  },

  watch: {
    // update search result on every input
    input() {
      if (this.input.length > 2) {      // api needs at least two letters. else error
        this.sendRequest();
      }
    },
  },

  methods: {
    // loaction api interface
    sendRequest() {
      locationApi({ params: { q: this.input } }).then((response) => {
        this.$store.commit({
          type: "storeSearchResult",
          results: response.data.results,
        });
      });
    },
    // highlight the active input in search result
    highlight(element) {
      //const serializedInput = new RegExp(this.input)
      // PREVENT XSS !
      if (element != null) {
        const string = element.formatted;
        return string.replace(
          this.input,
          "<strong>" + this.input + "</strong>"
        );
      }
    },
    addCard() {
      this.$store.commit({
        type: "addCard",
      });
      this.input = "";      // reset input
    },
    // select from the dropdown
    selectElement(index) {
      this.input = this.searchResult[index].formatted;
    },
  },
};
</script>

<style>
@import "../assets/view-mainPage.css";
</style>
