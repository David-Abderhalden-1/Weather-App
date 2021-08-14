import { createStore } from 'vuex'

export const store = createStore({
    state: {
        excludeAll: ['minutely', 'hourly', 'current', 'daily'],
        exclude: [],

        searchLocationResponse: {},
        cards: [],
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
        storeSearchResult(state, payload) {
            state.searchLocationResponse = payload.results;
        },

        addCard(state) {
            try{
                const location = state.searchLocationResponse[0]
                const cardBuilder = {
                    title: location.formatted,
                    lat: location.geometry.lat,
                    lng: location.geometry.lng,
                }
                if (!state.cards.some(card => card["title"] === cardBuilder.title)) {
                    state.cards.push(cardBuilder)
                }
                else {
                    alert("card has already been added.")
                }
            }
            catch (error){
                return 0
            }
            state.searchLocationResponse = {}
        }
    },
})