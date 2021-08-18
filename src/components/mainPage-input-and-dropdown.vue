<template>
  <input
    class="container__searchbar"
    type="text"
    placeholder="Search"
    v-model="input"
    @click="toggleOffEdit"
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
  <button
    class="container__edit-btn"
    v-if="input == ''"
    @click="switchEdit"
  >
    Edit
  </button>
  <button class="container__add-btn" v-if="input != ''" @click="addCard">
    Add
  </button>
</template>

<script>
import { mapGetters } from "vuex";
import { locationApi, weatherApi } from "../instances";
import { toTitleCase } from "../globalFunctions";

export default {
  name: "mainPage-input-and-dropdown",
  props: {
    switchEdit: Function,
    toggleOffEdit:Function,
    inEdit: Boolean,
  },

  data() {
    return {
      input: "", // linked to input field
      weather: [],
      temperature: [],
    };
  },

  computed: {
    // data from store
    ...mapGetters({
      searchResult: "getSearchLocationResponse", // api search data
      cards: "getCards", // all cards
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
      if (this.input.length > 2) {
        // api needs at least two letters. else error
        this.requestLocation();
      }
    },
  },

  methods: {
    // loaction api interface
    requestLocation() {
      locationApi({
        params: {
          q: this.input,
        },
      }).then((response) => {
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
        const string = toTitleCase(element.formatted);
        const formattedInput = toTitleCase(this.input);
        return string.replace(
          formattedInput,
          "<strong>" + formattedInput + "</strong>"
        );
      }
    },

    addCard() {
      this.$store.commit({
        type: "addCard",
      });
      this.input = ""; // reset input
    },

    // select from the dropdown
    selectElement(index) {
      this.input = this.searchResult[index].formatted;
    },
  },

  created() {
    if (this.cards.length > 0) return;
    if (localStorage.getItem("cards")) {
      var lsCards = JSON.parse(localStorage.getItem("cards"));
      for (let i = 0; i < lsCards.length; i++) {
        this.cards.push(lsCards[i]);
      }
    }
  },
};
</script>

<style>
</style>