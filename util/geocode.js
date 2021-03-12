const request = require('postman-request');

const geocode = (address, errorCallBack, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoianVuYWlkenViYWlyIiwiYSI6ImNrNGkzcTZxZzBpYXMzZXB3cTM2b3ozcnYifQ.Bx4Plv1A-KsDKdsQ1DRf9w&limit=1`

    request.get({ url: url, json: true }, (error, response) => {
        if (error) {
            errorCallBack(error);
            return;
        }
        if (response.body.features.length > 0) {
            const { center, place_name } = response.body.features[0];
            const data = `Latitude is ${center[1]} and longitude ${center[0]} and place name ${place_name}`;
            callback({
                latitude: center[1],
                longitude: center[0],
                place: place_name
            });
        } else {
            errorCallBack('Wrong query provided ');
        }
    });

};


module.exports = geocode;