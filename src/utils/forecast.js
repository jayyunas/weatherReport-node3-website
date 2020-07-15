const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude + '&appid=69a3d05f30bea7d3f8b3e30bb1f90f83&units=metric'

    request({ url: url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.message) {
            callback('Unable to find location.' + body.message, undefined)
        } else {
            const data = body.current
            callback(undefined, {
                temperature: data.temp,
                feels_like: data.feels_like,
                humidity: data.humidity,
                description: data.weather[0].description,
                forecast: "It is currently " + data.temp + " degrees. It looks like " + data.weather[0].description + " with the current feel being " + data.feels_like + " degrees due to " + data.humidity + "% humidity."
            })
        }
    })
}

module.exports = forecast