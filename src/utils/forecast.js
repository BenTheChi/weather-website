const request = require('request')

const forecast = (latitude, longitude, location, callback) => {
    const url = 'https://api.darksky.net/forecast/507ff5dbbd683cf9292717ae61d6c7cf/'+latitude+','+longitude;
    console.log(url)
    request({ url: url, json: true }, (error, { body }) => { 
        if (error){
            callback('Unable to connect to forecast services.', undefined);
        } else if (body.code) {
            callback('Code ' + body.code)
        } else {
            callback(undefined, {
                currTemp: body.currently.temperature,
                currRain: body.currently.precipProbability,
                currSummary: body.currently.summary,
                location
            })
        }
    })
}

module.exports = forecast;