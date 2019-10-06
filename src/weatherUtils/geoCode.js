const request = require('request');

const geoCode = (address,callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1IjoiYWJoaXNoZWs4NzQiLCJhIjoiY2swZ3Z5aDI1MDR1ajNkbGo1a21yeWFucCJ9.gVuct0TRdKcofiQIqPjCfg";
    request.get({url, json: true},(error,response) => {
        if(error) {
            callback('Unable to find location!', {});
        } else if(!response.body.features && response.body.message) {
            callback('Url is incorrect',{});
        } else if(response.body.features.length === 0) {
            callback('Unable to find location. Please try with another search!',{});
        } else {
            callback(undefined, {
                latitude : response.body.features[0].center[1],
                longitude : response.body.features[0].center[0],
                location: response.body.features[0].place_name
            });
        }
    });
}


module.exports = geoCode;
