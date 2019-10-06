const path = require('path');
const express = require('express');
const hbs = require('hbs');


const geoCode = require('./weatherUtils/geoCode.js');
const forecast = require('./weatherUtils/forecast.js');

const app = express();

// console.log(__dirname);
// console.log(__filename);

const publicDirPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');
hbs.registerPartials(partialsPath);

app.set('view engine', 'hbs');
app.set('views', viewsPath);

app.use(express.static(publicDirPath));

app.get('', (req,res) => {
    res.render('index', {
        title:'Home',
        name:'Abhishek Raut'  
    });
});

app.get('/help', (req,res) => {
    res.render('help',{
        title:'Help',
        helptext: 'This is my helptext',
        name:'Abhishek Raut'
    });
});


app.get('/help/*', (req,res) => {
    res.render('404',{
        title:'404',
        name:'Abhishek Raut',
        errorMessage: 'Help Page not found'
    });
});

app.get('/about', (req,res) => {
    res.render("about", {
        title:'About',
        age:31,
        name:'Abhishek Raut'
    });
});


app.get('/about/*', (req,res) => {
    res.render("404", {
        title:'404',
        name:'Abhishek Raut',
        errorMessage: 'About Page not found'
    });
});

app.get('/weather', (req,res) => {
    if(!req.query.address) {
        return res.send({
            error: "Please provide address term"
        });
    } else {
        let address = req.query.address;
        geoCode(address,(error,{latitude, longitude, location}) => {
            if(error) {
                return res.send({error});
            }
            
            forecast(latitude,longitude, (forecastError,forecast) => {
                if(forecastError) {
                    return res.send({error: forecastError});
                }
                return res.send({
                    forecast,
                    location,
                    address: req.query.address
                });
            });
        });

    }
});

app.get('/products', (req,res) => {
    if(!req.query.search) {
        return res.send({
            error: "Please provide search term"
        });
    } else {
        return res.send({
            products: []
        });
    }
});

app.get('*', (req,res) => {
    res.render('404',{
        title:'404',
        name:'Abhishek Raut',
        errorMessage: 'Page not found'
    });
});

app.listen(3000, () => {
    console.log('Server is up and running!');
})