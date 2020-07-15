const path = require('path')
const express = require("express")
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const { response } = require('express')
const { dirname } = require('path')

const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather Report",
        name: "Jay Yunas"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About Me",
        name: "Jay Yunas"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: "Helpful Text",
        title: 'Help',
        name: 'Jay Yunas'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide a search term.'
        })
    }
    const address = req.query.address
    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error
            })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
            }
            return res.send({
                location,
                data: forecastData,
                forecast: forecastData.forecast,
                address: address
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Help',
        name: 'Jay Yunas',
        errorMessage: 'Error 404: Help Article NOT Found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Jay Yunas',
        errorMessage: 'Error 404: Page Not Found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})