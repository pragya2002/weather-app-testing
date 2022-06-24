
const request = require("postman-request")
const forecast = (cordinates, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=bf20a1d94ec30f2f978b5d405539dac0&query=" + cordinates.latitude + "," + cordinates.longitude + "&units=f"

    request({ url: url, json: true }, (error, response) => {


        if (error) {
            callback("Unable to connect to weather services", undefined)
        }

        else if (response.body.error)
            callback("Wrong cordinates!", undefined)

        else {
            const data = "It is currently " + response.body.current.temperature + " degrees F out. There is a " + response.body.current.precip + "% chance of rain."

            callback(undefined, data)
        }

    })
}

module.exports = forecast