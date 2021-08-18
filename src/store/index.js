import { createStore } from 'vuex'
import { weatherApi } from '../instances'

export const store = createStore({
    state: {
        //excludeAll: ['minutely', 'hourly', 'current', 'daily'],     // all weather api 'exclude' param options
        //exclude: [],
        searchLocationResponse: {}, // tmp search result storage
        cards: [], // all active cards.
        loaded: false,
    },
    getters: {
        getSearchLocationResponse(state) {
            return state.searchLocationResponse
        },
        getCards(state) {
            if(state.cards.length == 0 && !state.loaded) { 
                state.cards = JSON.parse(localStorage.getItem('cards')) || []
                state.loaded = true
             }
            return state.cards
        },

    },
    mutations: {
        // results from search of the location api interface are stored
        storeSearchResult(state, payload) {
            state.searchLocationResponse = payload.results;
        },

        async addCard(state, payload) {
            let location = state.searchLocationResponse[0]

            // Top result is reformatted and stored as card
            if(payload.resultIndex){
                location = state.searchLocationResponse[payload.resultIndex]
            }

            try {
                // requestWeather
                let weatherId =  
                await weatherApi({
                    params: {
                    lat: location.geometry.lat,
                    lon: location.geometry.lng,
                    exclude: 'hourly,daily,minutely', //this.$store.dispatch('getExcluded', {include: 'current'}),
                    },
                })
                weatherId = weatherId.data.current.weather[0].id
              
                // requestTemperatur
                let gradCelsius = 
                await weatherApi({
                    params: {
                    lat: location.geometry.lat,
                    lon: location.geometry.lng,
                    exclude: 'hourly,daily,minutely', //this.$store.dispatch('getExcluded', {include: 'current'}),
                    },
                })
                gradCelsius = gradCelsius.data.current.temp

                // build new Card
                const cardBuilder = {
                        title: location.formatted, // location preview name
                        weatherId: weatherId,
                        temp: gradCelsius,
                        lat: location.geometry.lat, // latitude
                        lng: location.geometry.lng, // longitude
                    }
                    // Prevent redundant cards
                if (!state.cards.some(card => card["title"] === cardBuilder.title)) {
                    state.cards.push(cardBuilder)
                } else {
                    alert("card has already been added.") // probably change
                }
            } catch (error) {
                return 0
            }
            state.searchLocationResponse = {} // reset the search results to null
            localStorage.setItem('cards', JSON.stringify(state.cards)); // add card to local storage
        },

        deleteCard(state, payload) {
          state.cards.splice(payload.index, 1)
        },
    },
    actions: {
        /*
        getExcluded(state, payload) {
          console.log(payload.include)
          const index = state.excludeAll.indexOf('current')
          state.exclude = state.excludeAll.splice(index)
          return state.exclude
        }
        */
    }
})
