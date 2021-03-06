const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectiryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectiryPath))
 
app.get('', (req, res) => {
    res.render('index', {
        title: 'JS-Weather',
        name: 'Yakov Tayar'
    })
})

app.get('/about', (req, res) =>{
    res.render('about', {
        title:'About me',
        name: 'Yakov Tayar'
    })
})

app.get('/help', (req, res) =>{
    res.render('help', {
        helpText: 'Please add the location to the search bar and press search',
        title:'Help',
        name: 'Yakov Tayar'
    })
})

app.get('/weather', (req, res) =>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) =>{
        if(error){
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forcastData) =>{
            if(error){
                return res.send({ error })
            }

            res.send({
                forecast: forcastData,
                location,
                address: req.query.address
            })

        })

    })

})

app.get('/products', (req, res) =>{
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title:'404',
        name: 'Yakov Tayar',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title:'404',
        name: 'Yakov Tayar',
        errorMessage: 'Page not found'
    })
})


app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

