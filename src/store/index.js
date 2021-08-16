import { createStore } from 'vuex'

export const store = createStore({
    state: {
        //excludeAll: ['minutely', 'hourly', 'current', 'daily'],     // all weather api 'exclude' param options
        //exclude: [],

        searchLocationResponse: {},         // tmp search result storage
        cards: [],          // all active cards.

// ---------------TEST DATA-------------------
        cities: [
          {
            name: 'Zürich',
            temperature: 26,
            weather: 'cloudy',
            lat: 57.38,
            lon: 85.84
          },
          {
            name: 'Bern',
            temperature: 29,
            weather: 'sunny',
            lat: 58.38,
            lon: 86.84
          },
          {
            name: 'Genf',
            temperature: 17,
            weather: 'rain',
            lat: 58.38,
            lon: 86.84
          },
        ]
// -------------------------------------------
    },
    getters: {
        getSearchLocationResponse(state) {
            return state.searchLocationResponse
        },
        getCards(state) {
            return state.cards
        },

        // ----------TEST DATA -------
        getLocationApi(state) {
            return state.locationApi
        },

        
        getCities(state){
          return state.cities;
        }
        // -------------------------

    },
    mutations: {
        // results from search of the location api interface are stored
        storeSearchResult(state, payload) {
            state.searchLocationResponse = payload.results;
        },

        addCard(state) {
            // Top result is reformatted and stored as card
            try{
                const location = state.searchLocationResponse[0]
                const cardBuilder = {
                    title: location.formatted,      // location preview name
                    lat: location.geometry.lat,     // latitude
                    lng: location.geometry.lng,     // longitude
                }
                // Prevent redundant cards
                if (!state.cards.some(card => card["title"] === cardBuilder.title)) {
                    state.cards.push(cardBuilder)
                }
                else {
                    alert("card has already been added.")       // probably change
                }
            }
            catch (error){
                return 0
            }
            state.searchLocationResponse = {}          // reset the search results to null
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