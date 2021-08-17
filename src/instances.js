const { default: axios } = require("axios");

// global GET headers
axios.defaults.headers.get["Content-Type: application/json"]
axios.defaults.headers.get["Custom-Header: Weather-App"]


// weather api (get weather data from lat / lng)
const weatherApi = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5/onecall?',
    timeout: 0,
    // hardcoded parameters
    method: "GET",
    params: {
        appid: 'c9d1e15767ae6baaa295a2528bf68403',        // API key in required
        units: 'metric',
    }
})


// location api (get coordinates lat / lng from place-name)
const locationApi = axios.create({
    baseURL: 'https://api.opencagedata.com/geocode/v1/json?',
    timeout: 0,
    method: "GET",
    // hardcoded parameters
    params: {
        key: '3704786e3b59476984ceb60d61cf5ab7', // API key in required
        no_annotations: 1, // less background data
        limit: 10, // amount of response objects
        _type: 'city',
    }
})


export {
    weatherApi,
    locationApi,
}
