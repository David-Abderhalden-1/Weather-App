<template>
  <div class="main-page">
    <div class="main-page__container">
      <input
        class="container__searchbar"
        type="text"
        placeholder="Search"
        v-model="input"
        @click="inEdit = false"
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
        @click="inEdit = !inEdit"
      >
        Edit
      </button>
      <button
        class="container__add-btn"
        v-if="input != ''"
        @click="addCard"
      >
        Add
      </button>
    </div>
    <div class="main-page__container2">
        <div class="conteiner2__city-loop" v-for="(card, index) in cards" :key="index">
          <weather-card class="city-loop__comp" :cityName="card.title" :cityTemp="requestTemperatur(index)" :weatherId="requestWeather(index)"></weather-card>
          <button v-if="inEdit" @click="deleteCard(index)" class="city-loop__del-btn">--</button>
        </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { locationApi, weatherApi } from "../instances";
import weatherCard from '@/components/weatherCard.vue';
import { toTitleCase } from '../globalFunctions';


export default {
  components: { weatherCard },
  name: 'App',

  data() {
    return {
      input: "", // linked to input field
      weather: [],
      temperature: [],
      inEdit: false
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

    requestWeather(index) {
      const activeCard = this.cards[index]
      weatherApi({
        params: {
          lat: activeCard.lat,
          lon: activeCard.lng,
          exclude: 'hourly,daily,minutely', //this.$store.dispatch('getExcluded', {include: 'current'}),
        },
      }).then((response) => {
        this.weather[index] = response.data.current.weather[0].id
      })
      return this.weather[index]
    },

      requestTemperatur(index) {
      const activeCard = this.cards[index]
      weatherApi({
        params: {
          lat: activeCard.lat,
          lon: activeCard.lng,
          exclude: 'hourly,daily,minutely', //this.$store.dispatch('getExcluded', {include: 'current'}),
        },
      }).then((response) => {
        const kelvin = response.data.current.temp
        const gradCelsius = (kelvin-273.15)
        this.temperature[index] = gradCelsius.toFixed(2)
      })
      return this.temperature[index]
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
      console.log(this.cards)
      localStorage.setItem('cards', JSON.stringify(this.cards));
    },

    // select from the dropdown
    selectElement(index) {
      this.input = this.searchResult[index].formatted;
    },
    deleteCard(index) {
      this.$store.commit({
        type: 'deleteCard',
        index: index,
      })
      console.log(index)
      localStorage.setItem('cards', JSON.stringify(this.cards));
    }
  },
  created() {
    if(localStorage.getItem('cards')){
      var lsCards = JSON.parse(localStorage.getItem('cards'));
      for(let i = 0; i < lsCards.length; i++) {
        this.cards.push(lsCards[i])
      }
    }
  }
};
</script>

<style>
@import "../assets/view-mainPage.css";
</style>
