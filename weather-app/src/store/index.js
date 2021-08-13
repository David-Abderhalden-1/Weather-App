import { createStore } from 'vuex'

export const store = createStore({
    state: {
        weatherApiRoute: 'https://api.openweathermap.org/data/2.5/onecall?',
        weatherApiKey: 'cdb3d2c6335926ea02db7e9f0393d50b',
        weatherApi: null,

        locationApiRoute: 'https://api.opencagedata.com/geocode/v1/json?',
        locationApiKey: '3704786e3b59476984ceb60d61cf5ab7',
        locationApi: null,
        locationApiAmount: 10,
    },
    getters: {
        getWeatherApi(state) {
            return state.weatherApi
        },

        getLocationApi(state) {
            return state.locationApi
        }
    },
    mutations: {
        createWeatherAPI(state, payload) {
            state.weatherApi = `${state.weatherApiRoute}lat=${payload.lat}&lon=${payload.lon}&exclude=${payload.exclude}&appid=${state.weatherApiKey}`
        },

        createLocationAPI(state, payload) {
            state.locationApi = `${state.locationApiRoute}q=${payload.input}&no_annotations=1&limit=${state.locationApiAmount}&key=${state.locationApiKey}`
        }
    },
    mounted() {
        this.createAPI()
    },
})