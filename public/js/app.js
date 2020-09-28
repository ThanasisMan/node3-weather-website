console.log('Client side javascript file is loaded!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    const url = 'http://localhost:3000/weather?address=' + encodeURIComponent(location)

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
                messageTwo.textContent = ''
            } else {
                messageOne.textContent = 'The forecast info for ' + data.location + ' is:'
                messageTwo.textContent = data.weatherDescription + '. It is currently ' + data.forecast + ' degrees out. It feels like ' + data.feelslike + ' degrees out.'
            }

        })
    })
})