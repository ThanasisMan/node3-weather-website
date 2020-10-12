const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=' + process.env.FORECAST_API_KEY + '&query=' + latitude + ',' + longitude + '&units=m'

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback(body.error.info, undefined)
        } else {
            callback(undefined, {
                weatherDescription: body.current.weather_descriptions[0],
                temperature: body.current.temperature,
                feelslike: body.current.feelslike,
                humidity: body.current.humidity,
                weatherIconUrl: body.current.weather_icons[0],
                visibility: body.current.visibility,
                wind_speed: body.current.wind_speed,
                cloudcover: body.current.cloudcover
            })
        }
    })
}

module.exports = {
    forecast
}