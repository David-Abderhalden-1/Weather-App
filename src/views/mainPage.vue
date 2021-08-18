<template>
  <div class="main-page">
    <div class="main-page__container">
      <main-page-input-and-dropdown :switchEdit="switchEdit" :toggleOffEdit="toggleOffEdit" :inEdit="inEdit"></main-page-input-and-dropdown>
    </div>
    <div class="main-page__container2">
      <div
        class="container2__city-loop"
        v-for="(card, index) in cards"
        :key="index"
      >
        <weather-card
          class="city-loop__comp"
          :index="index"
          :card="card"
        ></weather-card>
        <button
          v-if="inEdit"
          @click="deleteCard(index)"
          class="city-loop__del-btn"
        >
          --
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import weatherCard from "@/components/weatherCard.vue";
import mainPageInputAndDropdown from "../components/mainPage-input-and-dropdown.vue";

export default {
  components: { weatherCard, mainPageInputAndDropdown },
  name: "App",

  data(){
    return {
      inEdit: false
    }
  },

  computed: {
    ...mapGetters({
      cards: "getCards", // all cards
    }),
  },
  methods: {
    deleteCard(index) {
      this.$store.commit({
        type: "deleteCard",
        index: index,
      });
      localStorage.setItem("cards", JSON.stringify(this.cards));
    },
    switchEdit(){
      this.inEdit = !this.inEdit
    },
    toggleOffEdit(){
      this.inEdit = false
    }
  },
};
</script>

<style>
@import "../assets/view-mainPage.css";
</style>
