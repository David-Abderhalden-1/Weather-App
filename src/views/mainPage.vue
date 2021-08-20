<template>
  <div class="main-page">
    <div class="main-page__container">
      <main-page-input-and-dropdown
        :switchEdit="switchEdit"
        :toggleOffEdit="toggleOffEdit"
        :inEdit="inEdit"
      ></main-page-input-and-dropdown>
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
        <main-page-button
          v-if="inEdit"
          :className="'city-loop__del-btn'"
          :buttonValue="'-'"
          :onClickFunction="deleteCard"
          :index="index"
        ></main-page-button>
      </div>
    </div>
    <div class="main-page__info">
      <img src="@/assets/img/down-arrow.svg" class="info__img"/>
      <p class="info__text">Swipe To Reload</p>
      <img src="@/assets/img/down-arrow.svg" class="info__img"/>
    </div>
    <update-alert></update-alert>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import weatherCard from "@/components/weatherCard.vue";
import mainPageInputAndDropdown from "../components/mainPage-input-and-dropdown.vue";
import mainPageButton from "../components/mainPage-button.vue";
import updateAlert from "../components/updateAlert.vue";
import "../swiped-events.js";

export default {
  components: {
    weatherCard,
    mainPageInputAndDropdown,
    mainPageButton,
    updateAlert,
  },
  name: "App",

  // on Page reload
  mounted() {
    this.$store.commit({type: "resetUpdate"})
    const component = this;
    document
      .getElementsByClassName("main-page")[0]
      .addEventListener("swiped-down", function () {
        component.updateAllData();
      });
  },

  data() {
    return {
      inEdit: false,
    };
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
    switchEdit() {
      this.inEdit = !this.inEdit;
    },
    toggleOffEdit() {
      this.inEdit = false;
    },
    // update data of all cards
    updateAllData() {
      for (let i = 0; i < this.cards.length; i++)
        this.$store.commit({
          type: "updateData",
          cardIndex: i,
        });
      this.$store.commit({ type: "toUpdated" });
    },
  },
};
</script>

<style src="@/assets/view-mainPage.css" scoped>

</style>
