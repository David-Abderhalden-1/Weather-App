import { createStore } from 'vuex'

export const store = createStore({
    state: {
        apiRoute: 'https://api.openweathermap.org/data/2.5/onecall?',
        apiKey: 'cdb3d2c6335926ea02db7e9f0393d50b',
        api: null,
    },
    getters: {
        getApi(state) {
            return state.api
        }
    },
    mutations: {
        createAPI(state, payload) {
            state.api = `${state.apiRoute}lat=${payload.lat}&lon=${payload.lon}&exclude=${payload.exclude}&appid=${state.apiKey}`
        }
    },
    mounted() {
        this.createAPI()
    },
})