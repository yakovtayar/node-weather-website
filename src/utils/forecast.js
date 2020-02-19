const request = require('request')

const forecast = (latitude, longitude, callback) =>{
    const url = 'https://api.darksky.net/forecast/43341d8d50bdb67deaaf2bf85260ee8d/'+latitude +','+longitude+'?units=si'
    
    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to weather service!', undefined) 
        } else if(body.error){
            callback('Unable to find location', undefined)
        } else{
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature +
             ' degrees out. The humidity today is '+ body.daily.data[0].humidity+'.' + ' There is ' + body.currently.precipProbability +
              '% chance of rain. The lowest temperature for today is ' +
               body.daily.data[0].temperatureMin + ' And the highest temperature for today is ' +
                body.daily.data[0].temperatureMax +'.')
        }       
    })
}

module.exports = forecast