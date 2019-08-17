const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/9b96945c90cbeffe1ed9361b95240e83/' + latitude + ',' + longitude

    request({url: url, json:true}, (error, response) => {
        if(error){

        } else if(response.body.error){
            callback('Unable to find location', undefined)
        } else{
            callback(undefined, response.body.daily.data[0].summary + 'It is currently ' + response.body.currently.temperature + 'degrees out. Those is a '+ response.body.currently.precipProbability+ '% chance of rain.')
        }
    })
}

module.exports = forecast