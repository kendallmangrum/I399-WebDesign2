// #0 array of image choices - feel free to adjust / add
const images = ['cyber_brad.png', 'kermit_tea.jpg', 'shocked_cat.jpg'];
const imagesString = images.toString();                                                // Converted to a string to use the .match method
// console.log(imagesString);


// #1 get elements (5 in all)
// grab containers for meme and image choices
// also two text inputs, and the button
let imgChoices = document.querySelector('.choices');
let memeCon = document.querySelector('.meme');
let msg1 = document.querySelector('#msg1');
let msg2 = document.querySelector('#msg2');
let bttn = document.querySelector('button');


// #2 display possible bkgs
// for each image choice in images, write a figure to hold each image
// use regex to grab the parts needed for alt and figcaption
// be clever - don't overthing - for e.g. grab once and then use string methods?

let reName = /\w+_\w+/g;                                                                  // Regex to get the image names
let reExtension = /\.\w{3}/g;
let imgNames = imagesString.match(reName);
let imgExtensions = imagesString.match(reExtension);

// console.log(imgNames);
// console.log(imgExtensions);

images.forEach(function (image, index) {                                                  // Loop through all the images and and insert them into the HTML. added images to the src since it wasn't given in the array
   imgChoices.insertAdjacentHTML("beforeend", `
      <figure>
         <img src="images/${image}" alt="${imgNames[index]}" class="active">
         <figcaption>${imgNames[index].replace('_', ' ')}</figcaption>
      </figure>`)
});
/* <figure>
      <img src="images/shocked_cat.jpg" alt="shocked_cat" class="active">
      <figcaption>shocked cat</figcaption>
    </figure> */




// #3 add event listener to each image choice
// grab all the images (select these elements)
let imgs = document.querySelectorAll('img');
// console.log(imgs);

// choose one image to be the default
// set this for you, you are welcome to mix it up
let selectedImg = 'images/kermit_tea.jpg';

// for each of the images, on click, make the clicked image active
// remember you can get event.target to find which button was clicked
imgs.forEach(img => {
   img.classList.remove('active');
   img.addEventListener('click', currentImage)
});

function currentImage() {
      for (let i = 0; i < imgs.length; i++) {
         imgs[i].classList.remove('active');
      }

      let currImg = event.target;
      let currImgSRC = event.target.getAttribute('src');
      console.log(currImgSRC);
      currImg.classList.add('active');
      if (currImg == null) {
         selectedImg = 'images/kermit_tea.jpg';
      }
      else {
         selectedImg = currImgSRC;
      }
      // selectedImg = currImgSRC;
}
// first remove the active class from all images
// then add active class to the current image clicked on
// don't forget to set the current image as your new selectedImg





// #4 add event listener to button
bttn.addEventListener('click', () => {
   memeCon.innerHTML = '';
   memeCon.style.backgroundImage = `url('${selectedImg}')`;
   // console.log("button is working");
   // console.log(selectedImg);
   memeCon.insertAdjacentHTML('beforeend', `
   <h2>${msg1.value}</h2>
   <h2>${msg2.value}</h2>`
   );
   msg1.value = '';
   msg2.value = '';
});
// clear the meme element of any previous HTML content
// set the selectedImg as a background image in .meme element (set a style)
// grab the values from the inputs
// construct HTML: (for example...)
/* <h2>online courses?</h2>
   <h2>info profs: no problem</h2> */
// insert HTML into meme element
// clear input values / set inputs to be empty




