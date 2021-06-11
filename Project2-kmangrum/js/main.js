// Part 1 - Populate HTML with the data
const drugSpot = document.querySelector('#drugs');                                              // The div named 'drugs' is where we want to place all of the drugs and their images/information

drugList.forEach(function(drug, index) {                                                        // Loop through each drug in the druglist
    const drugInfohtml = `                                                                      
    <div class='drug' data-position='${index}'> 
        <figure data-drug-name='${drug.name}&reg;' data-drug-amount='${drug.amount}'>
            <img src='images/${drug.slug}.jpg' alt='${drug.name}'>
            <figcaption>${drug.name}&reg;</figcaption>
        </figure>
    </div>`;                                                                                    // Place all the information and images for the drugs into html that we can insert
    drugSpot.insertAdjacentHTML('beforeend', drugInfohtml);                                     // Insert the html elements before the end of the 'drugs' div
});


// Part 4 - Eventlistener for drugs & connecting addDrug(drug)
document.querySelectorAll('.drug').forEach(drug => {                                           // Get all of the elements with the class 'drug' and loop through them, adding an eventlistener that works on click to run the addDrug() function. 
    drug.addEventListener('click', () => {
        addDrug(drug);
    });
});


let totalAmount = 0;                                                                            // Initialize a variable to keep track of the total amount of acetaminophen
let drugOrder = [];                                                                             // Initialize an array to store what drugs have been selected
let lastDrug;                                                                                   // Initialize a variable to keep track of what the last drug selected was

function addDrug(drug) {                                                                        // Create function that deals with adding the amounts of acetaminophen
    let lbl = document.querySelector('.label');                                                 // Get the label so that we change its text later
    let clickedDrug = drugList[drug.dataset.position];                                          // Use the dataset position to get the specific drug that was clicked

    drug.classList.toggle('selected');                                                          // Toggle the selected class so that the user can visually see what drugs have/haven't been selected. 

    let amount = clickedDrug.amount;                                                            // Create a variable amount to store the amount of acetaminophen the clicked drug contains

    if (drug.classList.contains('selected')) {                                                  // Check to see if the clicked drug now has the selected class, if so we update the total amount of acetaminophen
        totalAmount += amount;
        lastDrug = clickedDrug;                                                                 // Set the lastDrug to be the clickedDrug
        drugOrder.push(clickedDrug);                                                            // push the clickedDrug onto a stack so that we can keep track of the order the user has selected drugs
        
    }

    // Instead of adding a removeDrug function, I made the removing a part of addDrug. Same thing is accomplished and all the variables I would need to pass to the function are all already within addDrug. 
    else {                                                                                      // This is the case where the user deselected a drug
        totalAmount -= amount;                                                                  // Since the user removed a drug, its amount needs to be subtracted from the total
        for (let i = 0; i < drugOrder.length; i++) {                                            // Use a for-loop to find the drug that the user deselected and remove it from the stack/array
            if (drugOrder[i] == clickedDrug) {
                drugOrder.splice(i, 1); 
            }
        }
        lastDrug = drugOrder[drugOrder.length - 1];                                             // Set the lastDrug to most recent drug that has been added to the stack that is still selected
    }
    
    whichMessage(totalAmount);                                                                  // Call the whichMessage function which determines what message to display to the user based off of the total amount of acetaminophen
    barDisplay(totalAmount, lastDrug);                                                          // Call the barDisplay function that updates fill of the bar and the label that moves beside it
}


function whichMessage(totalAmount) {                                                            // Determines what message to display to the user based off of the total amount of acetaminophen
    let totalText = document.querySelector('.total');                                           // Get the .total element because that is where we are going to insert the message to the user
    totalText.innerHTML = '';                                                                   // Clear the current text in the message area so that only one message will display at a time

    let barColor = document.querySelector('span');                                              // Get the span element because it is the color that fills the bar on the page

    let msg;                                                                                    // Instantiate a variable to store our html that makes up our message
    if (totalAmount < 4000) {                                                                   // Check to see if totalAmount is less than first message threshold
        msg = `
            <h2>TOTAL</h2>
            <h1>${totalAmount}</h1>
            <h3>milligrams</h3>
        `;                                                                                      // Store the message in a variable
        totalText.insertAdjacentHTML('beforeend', msg);                                         // Insert the message before the end of the div called 'total'
        barColor.style.backgroundColor = 'gray';                                                // Style the color of the bar to match the warning message color for added effect
    }
    else if (totalAmount < 8000) {                                                              // Check to see if totalAmount is less than second message threshold
        msg = `
            <h2>TOTAL</h2>
            <h1 style='color: #D5B612;'>${totalAmount}</h1>
            <h3>milligrams</h3>
            <p>You've exceeded the FDA's recommended maximum daily limit of acetaminophen.</p>
        `;                                                                                      // Store the message in a variable
        totalText.insertAdjacentHTML('beforeend', msg);                                         // Insert the message before the end of the div called 'total'
        barColor.style.backgroundColor = '#D5B612';                                             // Style the color of the bar to match the warning message color for added effect
    }
    else if (totalAmount < 15000) {                                                             // Check to see if totalAmount is less than third message threshold
        msg = `
            <h2>TOTAL</h2>
            <h1 style='color: #D17827;'>${totalAmount}</h1>
            <h3>milligrams</h3>
            <p>You've exceeded the level at which liver damage can occur if taken for several days, according to McNeil, the maker of Tylenol.</p>
        `;                                                                                      // Store the message in a variable
        totalText.insertAdjacentHTML('beforeend', msg);                                         // Insert the message before the end of the div called 'total'
        barColor.style.backgroundColor = '#D17827';                                             // Style the color of the bar to match the warning message color for added effect
    }
    else {                                                                                      // Check to see if totalAmount is greater than last message threshold
        msg = `
            <h2>TOTAL</h2>
            <h1 style='color: #C20802;'>${totalAmount}</h1>
            <h3>milligrams</h3>
            <p>You've exceeded the threshold toxic dose of acetaminophen. A single dose at this level can result in death, according to medical experts and literature.</p>
        `;                                                                                      // Store the message in a variable
        totalText.insertAdjacentHTML('beforeend', msg);                                         // Insert the message before the end of the div called 'total'
        barColor.style.backgroundColor = '#C20802';                                             // Style the color of the bar to match the warning message color for added effect
    }
}


function barDisplay(totalAmount, drug) {                                                        // Function that updates the look of the bar and its label
    let bar = document.querySelector('span');                                                   // Get the span which acts as the fill of the bar
    let label = document.querySelector('.label');                                               // Get the label that accompanies the bar

    let newHeight = (totalAmount / 15000) * 100;                                                // Create a variable that makes the amount of acetaminophen for each drug appear as a proper ratio to the total amount that the bar contains when full

    if (newHeight > 100) {                                                                      // Cap off the total fill of the bar so that the fill doesn't rise above the top of the bar
        newHeight = 100;
    }

    bar.style.height = newHeight + '%';                                                         // Give the bar the height so that the colored fill rises to the correct proportion

    if (drug) {                                                                                 // Check to see if there has been a drug selected, if so we give the label the proper information and fill the bar according to the amount of acetaminophen the drug contains
        label.textContent = `${drug.name}® ${drug.amount}mg`;                                   // Give the label the information about the selected drug
        label.style.top = `-${newHeight}%`;                                                     // I styled the height of the label so that it is even with the current height of the fill of the bar
        label.style.left = '40px';                                                              // Instead of using flexbox, I use the left attribute to place the label beside the bar. It made more sense to me and was easier to get the desired effect that I wanted
    }
    else {
        label.textContent = '0mg';                                                              // If there are no drug(s) selected, we want the label to display the default of 0mg of acetaminphen 
        label.style.top = '0';                                                                  // We have the label go back to being at the bottom of the bar
        label.style.left = '40px';  
    }
}