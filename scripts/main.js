var submitGuessButton = document.getElementById("submitGuess");
var clearGuessButton = document.getElementById("clearGuess");
var resetGameButton = document.getElementById("resetGame");
var guessInputField = document.getElementById("userGuessInput");
var min_num = 0;
var max_num = 100;
var correctNumber = generateRandomNumber(min_num, max_num);
var currentUserGuess;
var userGuessCounter = 0;

window.onload = setFormNumberRange();

function resetCurrentGame(){
  resetWebPageContent();
  resetGameVariables();
}

function resetWebPageContent(){
  clearGuessInput();
  resetGameButton.disabled = true;
  document.getElementById("mostRecentGuess").innerHTML = "";
  document.getElementById("guessFeedback").innerHTML = "";
}

function resetGameVariables(){
  min_num = 0;
  max_num = 100;
  correctNumber = generateRandomNumber(min_num, max_num);
  userGuessCounter = 0;
}

function generateRandomNumber(min, max){
  let result = Math.random() * (max-min) + min;
  return Math.floor(result);
}

function setFormNumberRange(){
  guessInputField.min = min_num;
  guessInputField.max = max_num;
}

function disableGuessButtons(){
  submitGuessButton.disabled = true;
  clearGuessButton.disabled = true;
}

function enableGuessButtons(){
  submitGuessButton.disabled = false;
  clearGuessButton.disabled = false;
}

function clearGuessInput(){
  document.getElementById("userGuessForm").reset();
  disableGuessButtons();
}

function changeInputToNumber(input_value){
  return parseInt(input_value, 10);
} 

function verifyUserInput(){
  let user_input = changeInputToNumber(userGuessInput.value);
  if(user_input >= min_num && user_input <= max_num){
    enableGuessButtons();
  }
  else{
    disableGuessButtons();
  }
}

function processGuess(){
  userGuessCounter++;
  currentUserGuess = guessInputField.value;
  displayUserGuessContent();
}

function displayUserGuessContent(){
  resetGameButton.disabled = false;
  displayGuess();
  displayGuessFeedback();
}

function displayGuess(){
  document.getElementById("mostRecentGuess").innerHTML = `You guessed ${currentUserGuess}`;
}

function displayGuessFeedback() {
  if(currentUserGuess == correctNumber){
    document.getElementById("guessFeedback").innerHTML = "BOOM!";
    createNewRange();
  }
  else if(currentUserGuess < correctNumber){
    document.getElementById("guessFeedback").innerHTML = "Your guess is too low!";
  }
  else if(currentUserGuess > correctNumber){
    document.getElementById("guessFeedback").innerHTML = "Your guess is too high!";
  }
}

function createNewRange(){
  min_num = (min_num - 10);
  max_num = (max_num + 10);
  setFormNumberRange();
}

submitGuessButton.addEventListener('click',processGuess);
clearGuessButton.addEventListener('click',clearGuessInput);
resetGameButton.addEventListener('click',resetCurrentGame);

