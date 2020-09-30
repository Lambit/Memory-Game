const gameContainer = document.getElementById("game");
let card1 = null;
let card2 = null;
let noClick = false;
let cardsPicked = 0; 

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

function handleCardClick(e) {
  if (noClick) return;
  if (e.target.classList.contains("click")) return;

  // variable is to target the event of the card being clicked
  let chosenCard = e.target;
  chosenCard.style.backgroundColor = chosenCard.classList[0];

  // testing set of conditions of card 1 and 2. when card two is clicked 
  // it has two possible outcomes it could be equal to card1 or null. 
  if(!card1 || !card2) {
    chosenCard.classList.add("click");
    card1 = card1 || chosenCard;
    card2 = chosenCard === card1 ? null : chosenCard;
  }

  if(card1 && card2){
    noClick = true;
    let turn1 = card1.className;
    let turn2 = card2.className;

    // boolean that removes event when two colors match
    if(turn1 === turn2) {
      cardsPicked += 2;
      card1.removeEventListener("click", handleCardClick);
      card2.removeEventListener("click", handleCardClick);
      card1 = null;
      card2 = null;
      noClick = false;
    } else { 
      // time handeler with an anonomys fuction that hides colors after wrong pick
      setTimeout(function() {
        card1.style.backgroundColor = "";
        card2.style.backgroundColor = "";
        card2.classList.remove("click");
        card1.classList.remove("click");
        card1 = null;
        card2 = null; 
        noClick = false;
      }, 1000);
    }
  }
// alert when all right colos are picked
if (cardsPicked === COLORS.length) alert("WOW YOU'RE SPECIAL!!!!");
}

// // when the DOM loads
createDivsForColors(shuffledColors);
