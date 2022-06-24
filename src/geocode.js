const request = require("postman-request")

const geocode = (address, callback) => {
    const geo_url = "http://api.positionstack.com/v1/forward?access_key=24d522909e3e052dd7173d50c0ea2eaf&query=" + address


    request({ url: geo_url, json: true }, (error, response) => {

        if (!response.body.data)
            callback("Please enter a valid location!", undefined)

        else if (response.body.data.length == 0)
            callback("Please enter a valid location!", undefined)


        else {
            const cordinates = {
                "latitude": response.body.data[0].latitude,
                "longitude": response.body.data[0].longitude,
                "location": response.body.data[0].label
            }
            callback(undefined, cordinates)
        }

    })

}


module.exports = geocode