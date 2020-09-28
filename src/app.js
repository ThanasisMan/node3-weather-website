const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const path = require('path')
const express = require('express')
const hbs = require('hbs')

//console.log(path.join(__dirname, '../public'))

const app = express()

const port = process.env.PORT || 3000

// Define paths for express config
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup Handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: "Thanassis"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        helpText: 'This documantation will help you through serfing the whether app!',
        name: 'Thanassis'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Thanassis'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }
    const location = req.query.address
    geocode.geocode(location, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error: error
            })
        }

        forecast.forecast(latitude, longitude, (error, { weatherDescription, temperature, feelslike, humidity, weatherIconUrl } = {}) => {
            if (error) {
                return res.send({
                    error: error
                })
            }

            res.send({
                    location: location,
                    weatherDescription: weatherDescription,
                    forecast: temperature,
                    feelslike: feelslike,
                    address: req.query.address,
                    humidity: humidity,
                    weatherIconUrl: weatherIconUrl
                })
                //console.log('The forecast info for ' + location + ' is:')
                //console.log(weatherDescription + '. It is currently ' + temperature + ' degrees out. It feels like ' + feelslike + ' degrees out.')
        })
    })


})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'My 404 page',
        errorMessage: 'The help article not found!',
        name: 'Thanassis'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'My 404 page',
        errorMessage: 'The page not found',
        name: 'Thanassis'
    })
})

app.listen(port, () => {
    console.log('The server start listen at post ' + port + '!')
})