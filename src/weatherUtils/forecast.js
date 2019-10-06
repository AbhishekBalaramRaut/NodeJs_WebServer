const request = require('request');

const forecast = (latitude, longitude,callback) => {
    const url = "https://api.darksky.net/forecast/43a012a43709b82aa91458bbbfc6e18d/"+latitude+","+longitude+"?lang=en";
    request.get({url: url, json: true},(error,response) => {
        if(error) {
            callback('Unable to find location!', undefined);
        } else if(response.body.error) {
            callback('Unable to find location. Please try after some time',undefined);
        } else if(!response.body.daily) {
            callback('Url seems to be wrong',undefined);
        } else {
            callback(undefined, response.body.daily.data[0].summary + ' Current temperature is '+response.body.currently.temperature);
        }
    });
}


module.exports = forecast;