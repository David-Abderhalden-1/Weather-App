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
  <main-page-button
    :className="'container__edit-btn'"
    :buttonValue="'Edit'"
    v-if="input == ''"
    :onClickFunction="switchEdit"
  ></main-page-button>
  <main-page-button
    :className="'container__add-btn'"
    :buttonValue="'Add'"
    v-if="input != ''"
    :onClickFunction="addCard"
  ></main-page-button>
</template>

<script>
import { mapGetters } from "vuex";
import { locationApi, weatherApi } from "../instances";
import { toTitleCase } from "../globalFunctions";
import mainPageButton from "./mainPage-button.vue";

export default {
  name: "mainPage-input-and-dropdown",
  props: {
    switchEdit: Function,
    toggleOffEdit: Function,
    inEdit: Boolean,
  },

  components: {
    mainPageButton,
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
        this.$store.commit({
          type: "storeSearchResult",
          input: this.input,
        });
      }
      else {
        this.$store.commit({
          type: "clearSearchResult"
        })
      }
    },
  },

  methods: {
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

    addCard(index) {
      // add card
      this.$store.commit({
        type: "addCard",
        resultIndex: index,
      });
      // show info banner
      this.input = ""; // reset input
      this.$store.commit({
        type: "toUpdated",
      });
    },

    // select from the dropdown
    selectElement(index) {
      this.addCard(index);
    },
  },

  created() {
    // check if cards already loaded
    if (this.cards.length > 0) return;
    // check if Local Storage has cards
    if (localStorage.getItem("cards")) {
      // store cards from store in view data
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