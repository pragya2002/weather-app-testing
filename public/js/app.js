


const weatherForm = document.querySelector("form")

const searchbar = document.querySelector("input")

const mess1 = document.querySelector("#one")
const mess2 = document.querySelector("#two")

weatherForm.addEventListener("submit", (e) => {
    mess1.textContent = "Loading...."
    e.preventDefault()
    const address = searchbar.value

    fetch("/weather?address=" + address).then((res) => res.json().then((data) => {
        if (data.error) {
            console.log(data.error)
            mess1.textContent = data.error
        }

        else {
            console.log(data.location, data.forecast)

            mess1.textContent = data.location
            mess2.textContent = data.forecast
        }
    }

    ))

})

