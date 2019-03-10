const path = require('path');
const express = require('express');
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')


console.log(__dirname);
console.log(path.join(__dirname, '../public'));

const app = express();
const port = process.env.PORT || 3000;

//Define paths for Express config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Ben Chi'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Ben Chi'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Get some help.  Now.',
        title: 'Help',
        name: 'Ben Chi'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
           return res.send({ error }) 
        }
        
        forecast(latitude, longitude, location, (error, data) => {
            if(error){
                return res.send({
                    error: 'There was an error retrieving the weather for this location'
                }) 
             }
             
            res.send({
                forecast: "The current temperature is " + data.currTemp + ".  The chance of rain is " + data.currRain * 100 + "%.  Today's forecast is " + data.currSummary.toLowerCase() + ".",
                address: req.query.address,
                location
            });
        })
    })

})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search);
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help 404',
        message: 'No help article of this id'
    });
})

app.get('/about/*', (req, res) => {
    res.render('404', {
        title: 'About 404',
        message: 'No about article of this id'
    });
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Page Not Found'
    });
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
