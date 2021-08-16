import { createStore } from 'vuex'

export const store = createStore({
    state: {
        //excludeAll: ['minutely', 'hourly', 'current', 'daily'],     // all weather api 'exclude' param options
        //exclude: [],

        searchLocationResponse: {},         // tmp search result storage
        cards: [],          // all active cards.
    },
    getters: {
        getSearchLocationResponse(state) {
            return state.searchLocationResponse
        },
        getCards(state) {
            return state.cards
        },
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