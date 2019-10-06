
const https = require('https');

const url = "https://api.mapbox.com/v5/mapbox.places/chambharli.json?access_token=pk.eyJ1IjoiYWJoaXNoZWs4NzQiLCJhIjoiY2swZ3Z5aDI1MDR1ajNkbGo1a21yeWFucCJ9.gVuct0TRdKcofiQIqPjCfg";

const request = https.request(url , (response) => {
    let data = '';

    response.on('data', (chunk) => {
        console.log(chunk.toString());
        data = data + chunk.toString();
    });

    response.on('end', () => {
        console.log(JSON.parse(data));
    });
});

request.on('error', (error) => {
    console.log('error',error);
});

request.end();