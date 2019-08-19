const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//console.log(__dirname)
//console.log(path.join(__dirname, '../public'))

const app = express()
const port = process.env.PORT || 3000

//Define pahts for Express config
const publicDirectorPath = path.join(__dirname, '../public')
const viewspath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewspath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectorPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name : 'Prasad Gorle'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title : 'About',
        name: 'Gorle'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpfull text.',
        title: 'Help',
        name: 'Prasad G'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You much provide the address!'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
            if(error){
                return res.send({ error })
            }

            forecast(latitude, longitude, (error, forecastData) => {
                if(error){
                    return res.send({ error })
                }
                res.send({
                    forecast: forecastData,
                    location,
                    address:req.query.address
                })
            })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
       return res.send({
            error: 'You much provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Prasad G',
        errorMessage: 'Help article not not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Prasad G',
        errorMessage : 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})