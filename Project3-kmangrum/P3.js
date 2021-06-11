// **STEP ZERO: SET UP
// select HTML elements for canvas and clear
const canvas = document.querySelector('canvas');
let clearBttn = document.querySelector('.clear');


// get the size of the canvas
const { width, height } = canvas;


// initialize canvas drawing settings
// set the join, cap and width for our lines
let ctx = canvas.getContext('2d');
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 20;


// set a default color for drawing with
// this is one place where you can mess with 
// changing the color of the line since it's a variable
let color = 'black';
ctx.strokeStyle = color;

let h = 0;                                                                            // Added variables that I will use for the rainbow button feature
let s = 100;
let l = 50;

// **STEP ONE: test out canvas
// Place cursor in the middle and make a dot
// let x = width/2;
// let y = height/2;
// ctx.beginPath();
// ctx.moveTo(x, y);
// ctx.lineTo(x, y);
// ctx.stroke();


// initialize variables
// for use in mouseDraw()
let lastX = 0;                                                                        // set lastX, lastY postions
let lastY = 0;
let isDrawing = false;                                                                // isDrawing boolean for mouse drawing

// keyboard drawing
let keysPressed = {};                                                                 // create an object to keep track of when keys are pressed                                           
const moveAmount = 10;                                                                // set an amount of pixels to move by



// **STEP THREE: draw with the mouse
function mouseDraw(event) {
  // stop if not mouse down
  if (!isDrawing) return;
  
  ctx.beginPath();                                                                    // start the path and move to last x and y
  h += 5;                                                                             // Increment my variable so that the hue is increased, giving the rainbow effect
  setColor();                                                                         // Call the setColor function so that the right color is produced when drawing
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(event.offsetX * 2, event.offsetY * 2);                                   // connect the line to the new x and y
  ctx.stroke();                                                                       // draw the line
  [lastX, lastY] = [event.offsetX * 2, event.offsetY * 2];                            // reset lastX and lastY
}


// **STEP TWO: add event listeners for each of the mouse movements in canvas

canvas.addEventListener('mousedown', (event) => {
  isDrawing = true;                                                                   // on mousedown, isDrawing should be true, and lastX and lastY are reset
  [lastX, lastY] = [event.offsetX * 2, event.offsetY * 2];
});

canvas.addEventListener('mousemove', mouseDraw);                                      // on mousemove, we should draw - callback of mouseDraw 
canvas.addEventListener('mouseup', () => isDrawing = false);                          // on mouseup, isDrawing should be false

// if we also want to stop drawing if mouse leaves the canvas (optional)
// canvas.addEventListener('mouseout', () => isDrawing = false);


// **STEP FOUR: clear the screen
function clearCanvas() {
  // cool shake the canvas effect
  canvas.classList.add('shake');
  canvas.addEventListener('animationend', function() {
    canvas.classList.remove('shake');
  }, { once: true });

  // clear the screen
  ctx.clearRect(0, 0, width, height);

  // reset initial x and y positions
  lastX = 0;
  lastY = 0;
}

// add an event listener to clear button
clearBttn.addEventListener('click', clearCanvas);                                     // callback of clearCanvas


// **STEP FIVE: draw using keyboard's arrow keys
// on keydown event, capture any Arrow keys
// then move x and y based on that set amount
// draw a line 
let x = width / 2;                                                                    // I set my keyboard drawing to always start in the center of the screen
let y = height / 2;

document.addEventListener('keydown', (event) => {
  h += 5;                                                                             // Increment h variable so that the hue changes when keyboard drawing with rainbow option
  setColor();                                                                         // Call setColor function so the keyboard draws with the correct color
  
  if (event.key.includes('Arrow')) {                                                  // Check to see if key pressed is an arrow key

    event.preventDefault();                                                           // prevent normal arrow functionality
    keysPressed[event.key] = true;                                                    // keep track of keys pressed

    ctx.beginPath();                                                                  // Have to start the path for keyboard drawing
    ctx.moveTo(x, y);                                                                 // start the path with old x, y

    // Diagonals                                                                      // set new coordinates based on movement amount
    if (keysPressed.ArrowUp && keysPressed.ArrowRight) {
      ctx.lineTo(x += moveAmount, y -= moveAmount);                                   // Increment x and y according to what arrow keys are pressed
    }
    else if (keysPressed.ArrowUp && keysPressed.ArrowLeft) {
      ctx.lineTo(x -= moveAmount, y -= moveAmount);
    }
    else if (keysPressed.ArrowDown && keysPressed.ArrowRight) {
      ctx.lineTo(x += moveAmount, y += moveAmount);
    }
    else if (keysPressed.ArrowDown && keysPressed.ArrowLeft) {
      ctx.lineTo(x -= moveAmount, y += moveAmount);
    }

    // up, down, left, right
    else if (keysPressed.ArrowUp) { 
      ctx.lineTo(x, y -= moveAmount);
    }
    else if (keysPressed.ArrowDown) {
      ctx.lineTo(x, y += moveAmount);
    }
    else if (keysPressed.ArrowLeft) {
      ctx.lineTo(x -= moveAmount, y);
    }
    else if (keysPressed.ArrowRight) {
      ctx.lineTo(x += moveAmount, y);
    }
    
    ctx.stroke();                                                                     // draw the path
  }
});

// when we are done drawing with the arrow keys
// delete the event
document.addEventListener('keyup', (event) => {
  delete keysPressed[event.key];
})


// **STEP SIX: handle buttons
function handleButton(event) {

  // handle any color changes in a helper function
  // see STEP SEVEN
  let buttonList = [eraseBttn, blackBttn, wildBttn, randomBttn, rainbowBttn];         // I created a list of the buttons that I add the active class to so that I can loop through it to remove the active classes when clicking a differet button
  if (event.target.dataset.action != 'thin' && event.target.dataset.action != 'medium' && event.target.dataset.action != 'thick') {     // I don't want the active class to be removed if the radiobuttons are used
    for (let i = 0; i < buttonList.length; i++) {                                     // Loop through the length of the list of buttons
      if (buttonList[i].classList.contains('active')){                                // If the button has the active class, remove it so that only the most recent button that was clicked has the class
        buttonList[i].classList.toggle('active');
      }
  }
}

  if (event.target.dataset.action == 'erase') {                                       // If the erase button is selected
    eraseBttn.classList.toggle('active');                                             // give it the active class
    color = 'gray';                                                                   // change color to gray so that it looks like it is erasing
    ctx.strokeStyle = color;                                                          // make color actually appear when drawing
  }
  
  else if (event.target.dataset.action == 'black') {                                  // If the black button is selected
    blackBttn.classList.toggle('active');                                             // give it the active class
    color = 'black';                                                                  // change color to black
    ctx.strokeStyle = color;                                                          // make the drawing color be the new color
    }

  else if (event.target.dataset.action == 'wild') {                                   // If the wild button is selected
    wildBttn.classList.toggle('active');                                              // give it the active class
  }

  else if (event.target.dataset.action == 'random') {                                 // If the random button is selected
    randomBttn.classList.toggle('active');                                            // give it the active class
    let r = Math.ceil(Math.random() * 255);                                           // Create variables that are given random values 
    let g = Math.ceil(Math.random() * 255);
    let b = Math.ceil(Math.random() * 255);
    let randRGB = `rgb(${r}, ${g}, ${b})`;                                            // Combine all the variables to make a random color, I used rgb
    color = randRGB;
    ctx.strokeStyle = color;                                                          // Update color so that we draw with this random color
  }

  else if (event.target.dataset.action == 'rainbow') {                                // If the rainbow button is selected
    rainbowBttn.classList.toggle('active');                                           // give it the active class
  }



  if (event.target.dataset.action == 'thin') {                                        // If thin button is selected
    ctx.lineWidth = 5;                                                                // Make the line width small
  }
  if (event.target.dataset.action == 'medium') {                                      // If thin button is selected
    ctx.lineWidth = 20;                                                               // Make the line width between the smallest and largest
  }
  if (event.target.dataset.action == 'thick') {                                       // If thin button is selected
    ctx.lineWidth = 50;                                                               // Make the line width large
  }
 
}

// add an event listener on all buttons
// connect to handleButton callback
let eraseBttn = document.querySelector('.erase');
eraseBttn.addEventListener('click', handleButton);

let blackBttn = document.querySelector('.black');
blackBttn.addEventListener('click', handleButton);

let wildBttn = document.querySelector('.wild');
wildBttn.addEventListener('click', handleButton);

let randomBttn = document.querySelector('.random');
randomBttn.addEventListener('click', handleButton);

let rainbowBttn = document.querySelector('.rainbow');
rainbowBttn.addEventListener('click', handleButton);

let thinBttn = document.querySelector('.thin');
thinBttn.addEventListener('click', handleButton);

let mediumBttn = document.querySelector('.medium');
mediumBttn.addEventListener('click', handleButton);

let thickBttn = document.querySelector('.thick');
thickBttn.addEventListener('click', handleButton);

// option: also handle radio buttons (select all inputs)
// either directly change values or write callback


// **STEP SEVEN: handle colors
// write a helper function to assist in changing the colors
// call from wherever you need to when drawing with mouse or keyboard

function setColor() {
  
  if (wildBttn.classList.contains('active')) {
    let hw = Math.ceil(Math.random() * 360);                                          // generate a random hue color
    let wildHSL = `hsl(${hw}, 100%, 50%)`;                                            // create variable to store random hsl color that is constantly changing
    color = wildHSL;
    ctx.strokeStyle = color;                                                          // change drawing color to new random hsl color
  }

  else if (rainbowBttn.classList.contains('active')) {
    let randHSL = `hsl(${h}, ${s}%, ${l}%)`;                                          // create random hsl color using the variables that were instantiated towards the top of file and is the incremented h
    color = randHSL;
    ctx.strokeStyle = color;                                                          // Set the drawing color to new hsl color that produces rainbow effect
  }
}