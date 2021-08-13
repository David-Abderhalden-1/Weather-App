import { createStore } from 'vuex'

export const store = createStore({
    state: {
        excludeAll: ['minutely', 'hourly', 'current', 'daily'],
        exclude: [],

        searchLocationResponse: {},
        cards: [],
    },
    getters: {
        getSearchLocationResponse(state){
            return state.searchLocationResponse
        },
        getCards(state){
            return state.cards
        },
    },
    mutations: {
        storeSearchResult(state, payload) {
            state.searchLocationResponse = payload.results;
        },

        addCard(state) {
            const location = state.searchLocationResponse[0]
            const cardBuilder = {
                title: location.formatted,
                lat: location.geometry.lat,
                lng: location.geometry.lng,
            }
            console.log(cardBuilder)
            state.cards.push(cardBuilder)
        }
    },  
})