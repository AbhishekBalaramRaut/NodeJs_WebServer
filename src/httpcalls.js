
const geoCode = require('./weatherUtils/geoCode.js');
const forecast = require('./weatherUtils/forecast.js');

let address = process.argv[2];
//address="chambharli";
if(address) {

geoCode(address,(error,{latitude, longitude, location}) => {
    if(error) {
        return console.log(error);
    }
    
    forecast(latitude,longitude, (forecastError,forecastData) => {
        if(forecastError) {
            return console.log('error',forecastError);
        }
        console.log(location);
        console.log(forecastData);
    });
});

} else  {
    console.log('Please provide location as an extra parameter');
}

