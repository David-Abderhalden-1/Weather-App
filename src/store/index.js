import { getFormatedTime, getDayByIndex } from "../globalFunctions"
import { createStore } from 'vuex'
import { weatherApi } from '../instances'

export const store = createStore({
    state: {
        searchLocationResponse: {}, // tmp search result storage
        cards: [], // all active cards.
        loaded: false, // if data was loaded to store
        updated: false,
    },
    getters: {
        getSearchLocationResponse(state) {
            return state.searchLocationResponse
        },
        getCards(state) {
            if (state.cards.length == 0 && !state.loaded) {
                state.cards = JSON.parse(localStorage.getItem('cards')) || []
                state.loaded = true
            }
            return state.cards
        },
        getUpdated(state) {
            return state.updated
        },

    },
    mutations: {
        // results from search of the location api interface are stored
        storeSearchResult(state, payload) {
            state.searchLocationResponse = payload.results;
        },

        async updateData(state, payload) {

            let card = state.cards[payload.cardIndex]

            let hourlyForecast = []
            let weeklyForecast = []
            let gradCelsius = 0
            let weatherId = 0

            // hourly data request
            let hourlyData =
                await weatherApi({
                    params: {
                        lat: card.lat,
                        lon: card.lng,
                        exclude: "daily,minutely,current",
                    },
                })
            hourlyData = hourlyData.data.hourly;

            // build hourly entry
            for (let i = 0; i < 24; i++) {
                let newHourlyEntity = {
                    hour: getFormatedTime(hourlyData[i].dt),
                    temp: hourlyData[i].temp.toFixed(1),
                };
                hourlyForecast.push(newHourlyEntity)
            }

            // weekly data request
            let weekyData =
                await weatherApi({
                    params: {
                        lat: card.lat,
                        lon: card.lng,
                        exclude: "hourly,minutely,current",
                    },
                })
            weekyData = weekyData.data.daily

            // build weekly entry 
            weekyData.forEach((el, index) => {
                let newWeeklyEntity = {
                    day: getDayByIndex(index),
                    max: el.temp.max.toFixed(0),
                    min: el.temp.min.toFixed(0),
                    ico: el.weather[0].id,
                }
                weeklyForecast.push(newWeeklyEntity);
            })

            // current data request
            let currendData =
            await weatherApi({
                params: {
                    lat: card.lat,
                    lon: card.lng,
                    exclude: 'hourly,daily,minutely', //this.$store.dispatch('getExcluded', {include: 'current'}),
                },
            })
            weatherId = currendData.data.current.weather[0].id
            gradCelsius = currendData.data.current.temp

            // update current card
            card.weatherId = weatherId
            card.temp = gradCelsius
            card.weekly = weeklyForecast
            card.hourly = hourlyForecast

            // update local Storage
            localStorage.setItem('cards', JSON.stringify(state.cards));

            console.log("updated data")
            
        },

        async addCard(state, payload) {
            let location = state.searchLocationResponse[0]

            // Top result is reformatted and stored as card
            if (Number.isInteger(payload.resultIndex)) {
                location = state.searchLocationResponse[payload.resultIndex]
            }

            try {
                let weatherId = 0
                let gradCelsius = 0

                // requestWeather
                let currendData =
                    await weatherApi({
                        params: {
                            lat: location.geometry.lat,
                            lon: location.geometry.lng,
                            exclude: 'hourly,daily,minutely', //this.$store.dispatch('getExcluded', {include: 'current'}),
                        },
                    })
                weatherId = currendData.data.current.weather[0].id
                gradCelsius = currendData.data.current.temp

                // build new Card
                const cardBuilder = {
                    title: location.formatted, // location preview name
                    weatherId: weatherId,
                    temp: gradCelsius,
                    lat: location.geometry.lat, // latitude
                    lng: location.geometry.lng, // longitude
                    weekly: [],                 // weekly forecast (empty when builded)
                    hourly: [],                 // weekly forecast (empty when builded)
                }
                // Prevent redundant cards
                console.log(cardBuilder)
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

        toUpdated(state) {
            state.updated = true
            setTimeout(function() {
                state.updated = false;
            }, 3000);
        },
        resetUpdate(state) {
            state.updated = false
        }
    },
})
