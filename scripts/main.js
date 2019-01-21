// creating variables to be called/redeclared in the file
// these variables are for documet elements
var submitGuessButton = document.getElementById("submitGuess");
var submitRangeButton = document.getElementById("submitRange");
var clearGuessButton = document.getElementById("clearGuess");
var resetGameButton = document.getElementById("resetGame");
var guessInputField = document.getElementById("userGuessInput");
// setting the default min and max values
var min_num = 0;
var max_num = 100;
// setting the correct number via a function declared below
var correctNumber = generateRandomNumber(min_num, max_num);
// decaring an undefined variable for the user's guess once it occurrs
var currentUserGuess;
// counts number of guesses
var userGuessCounter = 0;

// when window loads, function is called to reset game variables back to default
window.onload = resetGameVariables();

// function to reset current game whe button is clicked by calling two other functions to clear content
function resetCurrentGame(){
  resetGameVariables();
  resetWebPageContent();
}

function resetWebPageContent(){
// disabled reset button for default settings
  resetGameButton.disabled = true;
// function to clear existing content in the guess form
  clearGuessContent();
}

function clearGuessContent() {
// function to clear the input form
  clearGuessInput();
// clears the text feedback from making a guess
  document.getElementById("mostRecentGuess").innerHTML = "";
  document.getElementById("guessFeedback").innerHTML = "";
}


function resetGameVariables(){
// need to redelare min and max values to as first step to resetting game, so form range can be set
  min_num = 0;
  max_num = 100;
// setting form range min and max values
  setFormNumberRange();
// creating a new random number
  correctNumber = generateRandomNumber(min_num, max_num);
// resetting count to zero
  userGuessCounter = 0;
}

// takes two arguments of a range of numbers
function generateRandomNumber(min, max){
// used let because this doesnt need to be a globally scoped variable
  let result = Math.random() * (max-min) + min;
// returning integer only value using floor
  return Math.floor(result);
}

function setFormNumberRange(){
// sets the min and max values on the number form so user has to guess within range
  guessInputField.min = min_num;
  guessInputField.max = max_num;
// tells the user what the current range is on the page
  document.getElementById("rangeInformation").innerHTML = `Your range is <b>${min_num}</b> to <b>${max_num}</b>.`;
}

function disableGuessButtons(){
// disables buttons on the web page
  submitGuessButton.disabled = true;
  clearGuessButton.disabled = true;
}

function enableGuessButtons(){
// enables functions on the web page
  submitGuessButton.disabled = false;
  clearGuessButton.disabled = false;
}

function clearGuessInput(){
// resets guess form by clearing input
  document.getElementById("userGuessForm").reset();
// disables guess buttons
  disableGuessButtons();
}

function clearRangeInput(){
// resets form to create a specific range
  document.getElementById("userCreateRangeForm").reset();
// disables submit button for range
  submitRangeButton.disabled = true;
}

function changeInputToNumber(input_value){
// takes an input value (string) and returns and interger number value
  return parseInt(input_value, 10);
}

function verifyRangeInput(){
// used let because the below variables only need to be scoped within this method - creating these two variables to compare
  let range_min_value = changeInputToNumber(userMinNumInput.value);
  let range_max_value = changeInputToNumber(userMaxNumInput.value);
// if the range is valid in the form (min value < max value), the submit button becomes enabled
  if(range_min_value < range_max_value){
    submitRangeButton.disabled = false;
  }
// if the range is not valid, the button will remain disabled
  else{
    submitRangeButton.disabled = true;
  }
}

function verifyUserInput(){
// used let because doesnt need global scope - finding user input on page
  let user_input = changeInputToNumber(userGuessInput.value);
// checks to see if the guess is valid for the range
  if(user_input >= min_num && user_input <= max_num){
// if valid, button is enabled to guess
    enableGuessButtons();
  }
  else{
// if invalid guess, the button is not enabled to submit guess
    disableGuessButtons();
  }
}

function processRangeChange(){
// clears guess content first, since new range has been created
  clearGuessContent();
// parses input values into numbers
  min_num = changeInputToNumber(userMinNumInput.value);
  max_num = changeInputToNumber(userMaxNumInput.value);
// sets min and max values on form
  setFormNumberRange();
// creates new correct number
  correctNumber = generateRandomNumber(min_num, max_num);
}

function processGuess(){
// clears range input in case any is remaining
  clearRangeInput();
// adds one to to user guess counter
  userGuessCounter++;
// stores current user guess
  currentUserGuess = guessInputField.value;
// displays feebdack on guess and correctness
  displayUserGuessContent();
}

function displayUserGuessContent(){
// reset game button is enabled because a guess has occurred
  resetGameButton.disabled = false;
// guess is displayed for user
  displayGuess();
// feedback on guess is displayed
  displayGuessFeedback();
}

function displayGuess(){
// text displaying guess is shown on page
  document.getElementById("mostRecentGuess").innerHTML = `You guessed <b>${currentUserGuess}</b>`;
}

function displayGuessFeedback() {
// the range information on the page is cleared
  document.getElementById("rangeInformation").innerHTML = "";
// text display if guess is correct
  if(currentUserGuess == correctNumber){
    document.getElementById("guessFeedback").innerHTML = "BOOM! <b>That's right!</b> Let's play again...<b>and your range just got harder - check it out below!</b>";
// the range becomes harder if guess is correct
    createHarderRange();
  }
  else if(currentUserGuess < correctNumber){
// text is guess is too low
    document.getElementById("guessFeedback").innerHTML = "Your guess is <b>too low!</b>";
  }
// text if guess is too high
  else if(currentUserGuess > correctNumber){
    document.getElementById("guessFeedback").innerHTML = "Your guess is <b>too high!</b>";
  }
}

function createHarderRange(){
// takes current min number and subtracts 10
  min_num = (min_num - 10);
// takes current max number and adds 10
  max_num = (max_num + 10);
// sets min and max on form on webpage
  setFormNumberRange();
// generates new correct number
  correctNumber = generateRandomNumber(min_num, max_num);
}

// event listeners on all buttons, listening for a click and then calling  named function
submitGuessButton.addEventListener('click',processGuess);
clearGuessButton.addEventListener('click',clearGuessInput);
resetGameButton.addEventListener('click',resetCurrentGame);
submitRangeButton.addEventListener('click',processRangeChange);
