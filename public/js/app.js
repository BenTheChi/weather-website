const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const errorMessage = document.querySelector('#error')
const successMessage = document.querySelector('#success')
const locationMessage = document.querySelector('#location')


weatherform.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value;
    errorMessage.textContent = 'loading...'

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then(({error, location, forecast}) => {
            if(error){
                errorMessage.textContent = error;
            } else {
                errorMessage.textContent = '';
                locationMessage.textContent = location;
                successMessage.textContent = forecast;
            }
        })
    })
})