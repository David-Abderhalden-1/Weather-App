import { createStore } from 'vuex'

export const store = createStore({
    state: {
        weatherApiRoute: 'https://api.openweathermap.org/data/2.5/onecall?',
        weatherApiKey: 'cdb3d2c6335926ea02db7e9f0393d50b',
        weatherApi: null,
        excludeAll: ['minutely', 'hourly', 'current', 'daily'],
        exclude: [],

        locationApiRoute: 'https://api.opencagedata.com/geocode/v1/json?',
        locationApiKey: '3704786e3b59476984ceb60d61cf5ab7',
        locationApi: null,
        locationApiAmount: 10,

        // test data
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
          }
        ]
    },
    getters: {
        getWeatherApi(state) {
            return state.weatherApi
        },

        getLocationApi(state) {
            return state.locationApi
        },

        //test data
        getCities(state){
          return state.cities;
        }
    },
    mutations: {
        createWeatherAPI(state, payload) {
            state.exclude = state.excludeAll.filter(word => word != payload.include);
            state.weatherApi = `${state.weatherApiRoute}lat=${payload.lat}&lon=${payload.lon}&exclude=${state.exclude}&appid=${state.weatherApiKey}`
        },

        createLocationAPI(state, payload) {
            state.locationApi = `${state.locationApiRoute}q=${payload.input}&no_annotations=1&limit=${state.locationApiAmount}&key=${state.locationApiKey}`
        }
    },
})
