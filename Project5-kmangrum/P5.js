console.log('weather app online');

// please use this key for weather API
const API_KEY = "fc676f0c6032d100db307e3101c4f7fb";

// ONE
// select HTML elements for the form (zipcode & button)
let zip = document.querySelector('.zipcode');
let bttn = document.querySelector('button');
// select HTML elements for the output (error & info)
let errorElem = document.querySelector('.error');
let infoElem = document.querySelector('.info');


// THREE
// Write a function searchQuery to validate the zipcode
//    • check if the zipcode is a valid zipcode (user helper function)
//    • if it is valid (as in it's 5 digits), call getWeather()
//    • if it is not valid, update text inside 'error' HTML element -
//      text should say "Invalid Zip!" (or similar)
function searchQuery(zip) {
    zip = document.querySelector('.zipcode');                               // I reset the variable zip because otherwise it says it is null from when I set the variable at the beginning of the code
    if (validateZipCode(zip.value)) {
        getWeather(zip);
    }
    else {
        errorElem.textContent = 'Invalid Zip!';
        infoElem.textContent = '';                                          // Clear the previous weather information
    }
}



// FOUR
// Write a helper function validateZipCode
//    • use regex to make sure it's a series of 5 digits
function validateZipCode(zip) {
    let reZip = /^\d{5}$/g;                                                 // Checks if input is 5 digits
    if (zip.match(reZip)) {
        return true;
    }
    else {
        return false;
    }
}



// FIVE
// Write the function getWeather for fetching weather data using async/await
//    • use async and await
//    • fetch JSON data from OpenWeather API
//    • check the HTTP response status before proceeding in the function
//      - zip might be 5 numbers, but not all 5 number combos are actually zipcodes
//      - OR there could be server issues or internet issues...
//      HOWEVER if data request DID IN FACT work:
//        - clear out any previous error messages
//        - pull data from object for city, humidity, temperature and conditions
//        - by conditions, we mean "Rainy", "Snowy", etc.. 
//        - find where the docs talk about each parameter...
//        - https://openweathermap.org/current
//    • format pulled data using HTML
//    • display in 'info' HTML container - apply class 'weather-desc'
async function getWeather(zip) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zip.value}&appid=${API_KEY}`);
    // console.log(response);
    if (response.status !== 200) {
        console.log(response.status);
        return;
    }
    else {
        errorElem.textContent = '';
        const json = await response.json();
        let city = json.name;
        let humidity = json.main.humidity;
        let temperature = json.main.temp;
        tempF = Math.ceil((temperature - 273.15) * 9/5 + 32);                           // calculate the temperature in Fahrenheit
        let conditions = json.weather[0].description;
        // console.log(city, humidity, temperature, conditions);
        
        infoElem.textContent = '';                                                      // Clear any previous weather information
        let formattedHTML = `
        
        <p>City: ${city}</p>
        <p>Humidity: ${humidity}%</p>
        <p>Temperature: ${tempF}&deg;F</p>
        <p>Conditions: ${conditions}</p>`;
        infoElem.insertAdjacentHTML('beforeend', formattedHTML);
    }

}


// TWO
// When 'search' button is clicked:
//    call a function to first validate the zipcode typed in by the user
// in other words:
//    call searchQuery() and pass it zipcode's value
bttn.addEventListener('click', searchQuery);