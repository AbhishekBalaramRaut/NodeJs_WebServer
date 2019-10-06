console.log(' Javascript file is loaded');

const geoCode = (address) => {
    fetch('http://localhost:3000/weather?address='+address).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                messageOne.textContent = data.error;
                messageTwo.textContent = '';
            } else {
                messageOne.textContent = data.forecast;
                messageTwo.textContent = data.location;
            }
        })
    }).catch(error => {
        messageOne.textContent = 'Some issue in connecting the server';
        messageTwo.textContent = '';
    });;
}

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');


messageOne.textContent = '';
messageTwo.textContent = '';

weatherForm.addEventListener('submit',(event) => {
    event.preventDefault();
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    geoCode(search.value);
});