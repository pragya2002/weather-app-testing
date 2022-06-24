const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const path = require("path")

// used for setting paths for express configs
const publicDirectoryPath = path.join(__dirname, "../public")
const viewPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")


// used for setting the ststic directory ie. where all the static html files, css and js are stored
app.use(express.static(publicDirectoryPath))


// used to set the view engine of express to hbs to enable templating in our app
app.set('view engine', 'hbs')
app.set("views", viewPath)

// used for setting the partial handlebars
const hbs = require("hbs")
hbs.registerPartials(partialsPath)

// using res.render in order to refer to the handlebar file with that name
app.get("/", (req, res) => res.render("index", { title: "Home", body: "A simple Web Browsing App created by Pragya Awasthi to learn Express!" }))

app.get("/about", (req, res) => res.render("about", { title: "About", body: "This is a simple web serving app that helps a user to view weather forecast of a particular place by use of APIs" }))

app.get("/help", (req, res) => res.render("help", { title: "Help", body: "For help you can find relevant questions and answer here!" }))

const geocode = require("./geocode.js")
const forecast = require("./forecast.js")


app.get("/weather", (req, res) => {

    if (!req.query.address)
        return res.send({ error: "Kindy provide an address!" })


    const location = req.query.address
    geocode(location, (error, cordinates) => {
        // console.log(cordinates)
        if (!error) {
            forecast({ "latitude": cordinates.latitude, "longitude": cordinates.longitude }, (error, data) => {
                if (error)
                    res.send({ "error": error })

                else {
                    // console.log("Displaying Forecast for " + location + "(" + cordinates.latitude + ", " + cordinates.longitude + ") :")
                    // console.log(data)

                    res.send({ forecast: data, location: cordinates.location, latitude: cordinates.latitude, longitude: cordinates.longitude, address: req.query.address })
                }



            })
        }

        else
            res.send({ "error": error })

    }

    )
}


)

app.get("/help/*", (req, res) => res.render("404", { title: "Help article not found!" }))

app.get("*", (req, res) => res.render("404", { title: "Page not found!" }))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))