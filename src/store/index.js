import { getFormatedTime, getDayByIndex } from "../globalFunctions"
import { createStore } from 'vuex'
import { weatherApi, locationApi } from '../instances'

export const store = createStore({
    state: {
        searchLocationResponse: {}, // tmp search result storage
        cards: [], // all active cards.
        loaded: false, // if data was loaded to store
        updated: false,
        alertMessage: "",
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
        getAlertMessage(state) {
            return state.alertMessage
        }

    },
    mutations: {
        // results from search of the location api interface are stored
        storeSearchResult(state, payload) {
            locationApi({
                params: {
                    q: payload.input,
                },
            }).then((response) => {
                state.searchLocationResponse = response.data.results;
            });
        },

        async updateData(state, payload) {

            // active card
            let card = state.cards[payload.cardIndex]

            // formatted arrays
            let hourlyForecast = []
            let weeklyForecast = []

            // raw api data
            let weekyData = []
            let hourlyData = []
            let gradCelsius = 0
            let weatherId = 0

            // weather api request
            let response =
                await weatherApi({
                    params: {
                        lat: card.lat,
                        lon: card.lng,
                        exclude: "minutely"
                    }
                })
            hourlyData = response.data.hourly;
            weekyData = response.data.daily;
            weatherId = response.data.current.weather[0].id;
            gradCelsius = response.data.current.temp;

            // build hourly entry
            for (let i = 0; i < 24; i++) {
                let newHourlyEntity = {
                    hour: getFormatedTime(hourlyData[i].dt),    // hour in computer time
                    temp: hourlyData[i].temp.toFixed(1),        // temperature of hour
                };
                hourlyForecast.push(newHourlyEntity)
            }

            // build weekly entry 
            weekyData.forEach((el, index) => {
                let newWeeklyEntity = {
                    day: getDayByIndex(index),          // String name of day
                    max: el.temp.max.toFixed(0),        // maximal temperature of day
                    min: el.temp.min.toFixed(0),        // minimum temperature of day
                    ico: el.weather[0].id,              // icon id of day
                }
                weeklyForecast.push(newWeeklyEntity);
            })

            // update current card
            card.weatherId = weatherId
            card.temp = gradCelsius
            card.weekly = weeklyForecast
            card.hourly = hourlyForecast

            // update local Storage
            localStorage.setItem('cards', JSON.stringify(state.cards));
            // safe alert message
            state.alertMessage = "Updated Data"

        },

        async addCard(state, payload) {
            // top search result
            let location = state.searchLocationResponse[0]

            // click on specific search result
            if (Number.isInteger(payload.resultIndex)) {
                location = state.searchLocationResponse[payload.resultIndex]    // specific result is selected
            }

            try {
                // raw data
                let weatherId = 0
                let gradCelsius = 0

                // request weather data
                let currendData =
                    await weatherApi({
                        params: {
                            lat: location.geometry.lat,
                            lon: location.geometry.lng,
                            exclude: 'hourly,daily,minutely',
                        },
                    })
                weatherId = currendData.data.current.weather[0].id
                gradCelsius = currendData.data.current.temp

                // build new Card
                const cardBuilder = {
                    title: location.formatted,  // location preview name
                    weatherId: weatherId,       // current weather icon id
                    temp: gradCelsius,          // current temperature
                    lat: location.geometry.lat, // latitude
                    lng: location.geometry.lng, // longitude
                    weekly: [],                 // weekly forecast (empty when first builded)
                    hourly: [],                 // weekly forecast (empty when first builded)
                }
                // Prevent redundant cards
                if (!state.cards.some(card => card["title"] === cardBuilder.title)) {
                    state.cards.push(cardBuilder)
                    state.alertMessage = "Successfully added card"
                } else {
                    state.alertMessage = "Card already exists!"
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
            setTimeout(function () {
                state.updated = false;
            }, 3000);
        },

        resetUpdate(state) {
            state.updated = false
        },

        clearSearchResult(state) {
            state.searchLocationResponse = {}
        },
    },
})
