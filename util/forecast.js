const request = require('postman-request');


const forecast = ({ latitude, longitude },callback) => {
    const url =`http://api.weatherstack.com/current?access_key=998df640e9d19eed3fd5a4827c94d228&query=${encodeURIComponent(latitude)},${encodeURIComponent(longitude)}&units=f`;

    request.get({ url,json:true },(error,response)=>{
        if(error){
            console.log(error);
            callback(error,undefined);
            return;
        }

        const {  weather_descriptions, temperature } = response.body.current;
        
        console.log(response.body)
        callback(undefined, `Temperature is ${temperature} and it is ${weather_descriptions[0]}`);
    });
}

module.exports = forecast;