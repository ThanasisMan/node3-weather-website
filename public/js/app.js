const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')
const weatherIcon = document.querySelector('#weathericon')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    const url = '/weather?address=' + encodeURIComponent(location)

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    messageThree.textContent = ''
    weatherIcon.innerHTML = ''

    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
                messageTwo.textContent = ''
                messageThree.textContent = ''
                weatherIcon.innerHTML = ''
            } else {
                console.log(data)
                messageOne.textContent = `The current forecast info for `
                messageThree.textContent = data.location
                weatherIcon.innerHTML = '<img src="' + data.weatherIconUrl + '" >'
                messageTwo.textContent = `${data.weatherDescription}. It is currently ${data.forecast}℃ out. It feels like ${data.feelslike}℃ out. The humidity is ${data.humidity}%. The visibility is ${data.visibility}% and the cloudcover is ${data.cloudcover}%. The wind speed is ${data.wind_speed} km/h.`
            }

        })
    })
})