// console.log("JS connected");
// import data for cities in Indiana
import { cities } from './cities.js';
// notice cities.js has an "export"
// we can now use the variable 'cities' here in P6.js
// always check to make sure it works:
// console.log(cities);

// PROJECT 6 (SEE DIRECTIONS IN PROJECT ASSIGNMENT)
// Using this code as a starter, and any styling/code from P5 that is helpful
// Make a weather app that takes a zipcode but ALSO any CITY in Indiana (you'll need two inputs)
// then displays the local weather conditions

// THINGS WE ARE LOOKING FOR YOU TO DO:
// • verify that user has entered a valid city name (or zip)
// • for cities, get the city ID from our cities.js for use in the API call
// • update the user with the local weather conditions (at least what was in P5)
// • make sure the temperature is in F or C and not Kelvin
// • give the app an interface
//    if you aren't good with design, start with our CSS from last time
//    if you are, creating your own interface
// • add two new visual aides / weather information (your choice)
// - for example: (1) update the bkg with what the current weather looks like
// - (2) like the WTF weather app, have it display a fun message depending on the conditions
// - (3) give the user a radio button (or similar) choice for F or C readings
// - (4) make a fancier loading animation / graphic
// - (5) add an icon/img showing the conditions, the name of which is part of the current conditions JSON
//       BECAUSE OF SECURITY REASONS, YOU WOULD NEED TO DOWNLOAD THESE TO USE
//       but if you do that, the name of the image is in <data-response>.weather[0].icon
//       https://openweathermap.org/weather-conditions
//       OR download other images or create your own icons
// - (6) come up with your own addition / adjustment

// variables
let zipcode = document.querySelector('.zipcode');                                             // Grab the zipcode and city name inputs, the search button, and containers for info and errors             
let cityName = document.querySelector('.city');
let bttn = document.querySelector('button');
let infoElem = document.querySelector('.info');
let errorElem = document.querySelector('.error');
let reZip = /^\d{5}$/g;


// Event listeners
bttn.addEventListener('click', searchQuery);                                                  // Add eventlistener for when button is clicked, keylistener so user can search using enter
window.addEventListener('keydown', handleKeyDown);


// Keypress function
function handleKeyDown(event) {                                                               // Add fucntion so that pressing enter calls the searchQuery function just like pressing the button
  if (event.key == 'Enter') {
    searchQuery();
  }
}


// Validate Zip code
function validateZipCode(zip) {                                                               // Use regex to make sure that the zipcode input is a series of 5 digits
  let reZip = /^\d{5}$/g;
  if (zip.match(reZip)) {
    return true;
  } else {
    return false;
  }
}


// Validate City Name
function validateCityName(cityName) {                                                         // Loop through all of the city names in the array and check if the user input city name matches any
  for (let i = 0; i < 454; i++) {
    if (cityName == cities[i].name) {
      return true;
    }
  }
  return false;
}


// Inform users if City Name / Zipcode are valid
function searchQuery() {  
  zipcode = document.querySelector('.zipcode');                                               // Re-get zipcode and city input from user so they are not null
  cityName = document.querySelector('.city');

  if (zipcode.value != '') {                                                                  // Check to see if user input the zipcode, if so call displayWeather function
    if (validateZipCode(zipcode.value)) {
      displayWeather(zipcode.value);
    } else {                                                                                  // If user input a zipcode but it's invalid, display error message
        errorElem.textContent = 'Invalid Zip';
        infoElem.textContent = '';
    }
  }
  else if (cityName.value != '') {                                                            // Check to see if user input the city name, if so call displayWeather function
    if (validateCityName(cityName.value)) {
      displayWeather(cityName.value);
    } else {
      errorElem.textContent = 'Invalid City Name';                                            // If user input a city name but it's invalid, display error message
      infoElem.textContent = '';
    }
  }
}



const base = 'http://api.openweathermap.org/data/2.5/weather';
const api = 'c8c99ffa2b2249c1902417cdecdb3e3c';

// handle errors
function handleError(e) {
  console.log("ERROR!!", e);
}


// async function
async function displayWeather(id) {
  let cityID;

  if (id.match(reZip)) {                                                                      // Checks to see if we are using zipcode to produce the weather data
    const response = await fetch(`${base}?zip=${id}&appid=${api}`);
    if (response.status !== 200) {                                                            // If response status isn't good, show an error
      errorElem.textContent = `There was a ${response.status} error...`;
      return;
    }
    else {                                                                                    // If the response is good, move on with the rest of the function
      errorElem.textContent = '';                                                             // Clear any error messages
      const data = await response.json();                                                     // get data from response in form of json
    
      let city = data.name;                                                                   // Get city name from data
      let humidity = data.main.humidity;                                                      // Get humidity
      let temperatureF = Math.ceil((data.main.temp - 273.15) * 9/5 + 32);                     // Get temperature in Fahrenheit
      let temperatureC = Math.ceil((data.main.temp - 273.15));                                // Get temperature in Celsius
      let conditions = data.weather[0].description;                                           // Get weather description
      let windSpeed = Math.ceil(data.wind.speed * 2.237);                                     // Get wind speed in miles per hour

      let temperature;                                                                        // Set temperature variable that we can store either the Fahrenheit or Celsius temp depending on what the user selects
      if (document.querySelector('#fahrenheit').checked) {                                    // Check to see if Fahrenheit radio button is selected
        temperature = `${temperatureF}&deg;F`;                                                // If yes, store Fahrenheit, otherwise store celsius
      } else {
        temperature = `${temperatureC}&degC`;
      }
      
      infoElem.textContent = '';                                                              // Clear any previous weather info
      let formattedHTML =  `
      <p>City: ${city}</p>
        <p>Temperature: ${temperature}</p>
        <p>Humidity: ${humidity}%</p>
        <p class="cond">Conditions: ${conditions}</p>
        <p>Wind Speed: ${windSpeed}mph</p>`;
        infoElem.insertAdjacentHTML('beforeend', formattedHTML);                              // Insert the html elements that consist of all the weather information
      zipcode.value = '';                                                                     // Reset the zipcode and city name values, as well as the error messages if applicable
      cityName.value = '';
      errorElem.textContent = '';

      backgroundCondition(conditions);                                                        // Call backgroundCondition function that changes background and weather icon depending on the current weather

      if (windSpeed >= 35) {                                                                  // If the wind speed is greater than 35mph, have a caution alert pop up for the user to see
        setTimeout(function() { alert("CAUTION: High Winds"); }, 10);                         // Delayed alert borrowed from: https://stackoverflow.com/questions/1962861/javascript-alert-box-with-timer
      }
    }
  }

  else {                                                                                      // For when the user inputs the city name instead of the zipcode
    for (let i = 0; i < 454; i++) {                                                           // Gets the information for the specific city
      if (id == cities[i].name) {
        cityID = cities[i].id;
      }
    }
    const response = await fetch(`${base}?id=${cityID}&appid=${api}`);
    if (response.status !== 200) {                                                            // If response status isn't good, show an error
      return; 
    }
    else {                                                                                    // If the response is good, move on with the rest of the function
      const data = await response.json();                                                     // get data from response in form of json
      
      let city = data.name;
      let humidity = data.main.humidity;
      let temperatureF = Math.ceil((data.main.temp - 273.15) * 9/5 + 32);
      let temperatureC = Math.ceil((data.main.temp - 273.15));
      let conditions = data.weather[0].description;
      let windSpeed = Math.ceil(data.wind.speed * 2.237);

      let temperature;                                                                        // Set temperature variable that we can store either the Fahrenheit or Celsius temp depending on what the user selects
      if (document.querySelector('#fahrenheit').checked) {                                    
        temperature = `${temperatureF}&deg;F`;
      } else {
        temperature = `${temperatureC}&degC`;
      }
      
      infoElem.textContent = '';                                                              // Clear any previous weather info
      let formattedHTML =  `
        <p>City: ${city}</p>
        <p>Temperature: ${temperature}</p>
        <p>Humidity: ${humidity}%</p>
        <p class="cond">Conditions: ${conditions}</p>
        <p>Wind Speed: ${windSpeed}mph</p>`;
      infoElem.insertAdjacentHTML('beforeend', formattedHTML);                                // Insert the html elements that consist of all the weather information
      zipcode.value = '';                                                                     // Reset the zipcode and city name values, as well as the error messages if applicable
      cityName.value = '';
      errorElem.textContent = '';

      backgroundCondition(conditions);                                                        // Call backgroundCondition function that changes background and weather icon depending on the current weather
      if (windSpeed >= 35) {                                                                  // If the wind speed is greater than 35mph, have a caution alert pop up for the user to see
        setTimeout(function() { alert("CAUTION: High Winds"); }, 10);                         // Delayed alert borrowed from: https://stackoverflow.com/questions/1962861/javascript-alert-box-with-timer
      }
      }
  }



// Determine what background image and weather icon to use
  function backgroundCondition(condition) {                                                   // Checks to see what the current weather condition is and appliess the appropriate background image and weather icon that corresponds
    let cond = document.querySelector('.cond');
    if (condition.includes('clear sky')) {
      document.body.style.backgroundImage = "url('http://pages.iu.edu/~kmangrum/I399/WeatherApp/images/clear-sky.jpg')";
      cond.insertAdjacentHTML('beforeend', `<i class="fas fa-sun"></i>`); 
    }
    else if (condition.includes('clouds')) {
      document.body.style.backgroundImage = "url('http://pages.iu.edu/~kmangrum/I399/WeatherApp/images/scattered-clouds.jpg')";
      cond.insertAdjacentHTML('beforeend', `<i class="fas fa-cloud"></i>`);
    }
    else if (condition.includes('rain')) {
      document.body.style.backgroundImage = "url('http://pages.iu.edu/~kmangrum/I399/WeatherApp/images/rain.jpg')";
      document.body.style.backgroundSize = 'cover';
      cond.insertAdjacentHTML('beforeend', `<i class="fas fa-cloud-rain"></i>`);
    }
    else if (condition.includes('thunderstorm')) {
      document.body.style.backgroundImage = "url('http://pages.iu.edu/~kmangrum/I399/WeatherApp/images/thunderstorm.jpg')";
      cond.insertAdjacentHTML('beforeend', `<i class="fas fa-bolt"></i>`);
    }
    else if (condition.includes('snow')) {
      document.body.style.backgroundImage = "url('http://pages.iu.edu/~kmangrum/I399/WeatherApp/images/snow.jpg')";
      cond.insertAdjacentHTML('beforeend', `<i class="fas fa-snowflake"></i>`);
    }
    else if (condition.includes('mist') || condition.includes('fog')) {
      document.body.style.backgroundImage = "url('http://pages.iu.edu/~kmangrum/I399/WeatherApp/images/mist-fog.jpg')";
      cond.insertAdjacentHTML('beforeend', `<i class="fas fa-smog"></i>`);
    }
  }
}

