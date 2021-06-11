// In Class Challenge
/*
colors = ['#fc7703', '#56fc03', '#03fcba', '#03d3fc', '#9803fc', '#fc03b5'];

const backColor = document.querySelector('body');                       // Get the two elements we will be manipulating
const h1Code = document.querySelector('h1');

const bttn = document.querySelector('button');                          // Need to get button so we can add the event listener
bttn.addEventListener('click', randColor);                              // Add listener to make button call function

function randColor() {                                                  // function that randomly selects a hexcode out of our array
    let rand = Math.floor(Math.random() * colors.length);
    let newColor = colors[rand];
    backColor.style.backgroundColor = newColor;                         // Change the background color to chosen hexcode
    h1Code.textContent = newColor;                                      // Change the h1 to say what the new hexcode is
}
*/



// CHALLENGE 1
/*
const backColor = document.querySelector('body');                       // Get the two elements we will be manipulating
const h1Code = document.querySelector('h1');

const bttn = document.querySelector('button');                          // Need to get button so we can add the event listener
bttn.addEventListener('click', randColor1);                             // Add listener to make button call function

values = [0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F'];                 // Create an array that consists of all the possible hexcode values

function randColor1() {                                                 // Create function that randomly selects 6 values from the array
    let randHex = '#';                                                  // All hexcodes start with a '#'
    for (let i = 0; i < 6; i++) {                                       // Loop 6 times so that we get a full hexcode value
        let rand = Math.floor(Math.random() * values.length);           // Randomly choose each value
        randHex += values[rand];                                        // Add each value to our randHex variable that stores our hexcode
    }                                                                   
    backColor.style.backgroundColor = randHex;                          // Change the background color to chosen hexcode
    h1Code.textContent = randHex;                                       // Change the h1 to say what the new hexcode is
    }
    */



    // CHALLENGE 2

const backColor = document.querySelector('body');                       // Get the two elements we will be manipulating
const h1Code = document.querySelector('h1');
const h2Code = document.querySelector('h2');
h2Code.textContent = "HSL Color Code:"                                  // Since using the same HTML for all challenges, need to update to reflect HSL
h1Code.textContent = "hsl(0, 0%, 0%)"

const bttn = document.querySelector('button');                          // Need to get button so we can add the event listener
bttn.addEventListener('click', randColor2);                             // Add listener to make button call function


function randColor2() {                                                 // Create function that randomly generates values for HSL
    let randHSL = 'hsl(';                                                  
    let randH = Math.ceil(Math.random() * 360);                         // Generate value between 0-360 for Hue
    let randS = Math.ceil(Math.random() * 100);                         // Generate value between 0-100 for Saturation
    let randL = Math.ceil(Math.random() * 100);                         // Generate value between 0-100 for Lightness
    
    if (randL < 45) {                                                   // Check to see if Lightness is < 45 to know to change font color from black to white (I decided on 45% after randomly generating tons of colors and using my own judgement on what looked best).
        h1Code.style.color = 'white';                                   // Change color of h1 and h2 to white
        h2Code.style.color = 'white';
    }
    else {
        h1Code.style.color = 'black';                                   // Change color of h1 and h2 to black since lightness > 50
        h2Code.style.color = 'black';
    }

    randHSL += randH + ', ' + randS + '%, ' + randL + '%)';             // Put all the random values together into proper HSL form
                                                               
    backColor.style.backgroundColor = randHSL;                          // Change background color to new HSL     
    h1Code.textContent = randHSL;                                       // Change h1 to display HSL color code
       
}