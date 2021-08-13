const { default: axios } = require("axios");

axios.defaults.headers.get["Content-Type: application/json"]
axios.defaults.headers.get["Custom-Header: Weather-App"]


const weatherApi = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5/onecall?',
    timeout: 0,
    method: "GET",
    params: {
        key: 'cdb3d2c6335926ea02db7e9f0393d50b',
        _type: 'city',
    }
})


const locationApi = axios.create({
    baseURL: 'https://api.opencagedata.com/geocode/v1/json?',
    timeout: 0,
    method: "GET",
    params: {
        key: '3704786e3b59476984ceb60d61cf5ab7',
        no_annotations: 1,
        limit: 10,
    }
})


export {
    weatherApi,
    locationApi,
}