var submitGuessButton = document.getElementById("submitGuess");
var submitRangeButton = document.getElementById("submitRange");
var clearGuessButton = document.getElementById("clearGuess");
var resetGameButton = document.getElementById("resetGame");
var guessInputField = document.getElementById("userGuessInput");
var min_num = 0;
var max_num = 100;
var correctNumber = generateRandomNumber(min_num, max_num);
var currentUserGuess;
var userGuessCounter = 0;

window.onload = resetGameVariables();

function resetCurrentGame(){
  resetGameVariables();
  resetWebPageContent();
}

function resetWebPageContent(){
  resetGameButton.disabled = true;
  clearGuessContent();
}

function clearGuessContent() {
  clearGuessInput();
  document.getElementById("mostRecentGuess").innerHTML = "";
  document.getElementById("guessFeedback").innerHTML = "";
}

function resetGameVariables(){
  min_num = 0;
  max_num = 100;
  setFormNumberRange();
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
  document.getElementById("rangeInformation").innerHTML = `Your range is <b>${min_num}</b> to <b>${max_num}</b>.`;
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

function clearRangeInput(){
  document.getElementById("userCreateRangeForm").reset();
  submitRangeButton.disabled = true;
}

function changeInputToNumber(input_value){
  return parseInt(input_value, 10);
}

function verifyRangeInput(){
  let range_min_value = changeInputToNumber(userMinNumInput.value);
  let range_max_value = changeInputToNumber(userMaxNumInput.value);
  if(range_min_value < range_max_value){
    submitRangeButton.disabled = false;
  }
  else{
    submitRangeButton.disabled = true;
  }
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

function processRangeChange(){
  clearGuessContent();
  min_num = changeInputToNumber(userMinNumInput.value);
  max_num = changeInputToNumber(userMaxNumInput.value);
  setFormNumberRange();
  correctNumber = generateRandomNumber(min_num, max_num);
}

function processGuess(){
  clearRangeInput();
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
  document.getElementById("mostRecentGuess").innerHTML = `You guessed <b>${currentUserGuess}</b>`;
}

function displayGuessFeedback() {
  document.getElementById("rangeInformation").innerHTML = "";
  if(currentUserGuess == correctNumber){
    document.getElementById("guessFeedback").innerHTML = "BOOM! <b>That's right!</b> Let's play again...<b>but with a harder range! Check it out below.</b>";
    createHarderRange();
  }
  else if(currentUserGuess < correctNumber){
    document.getElementById("guessFeedback").innerHTML = "Your guess is <b>too low!</b>";
  }
  else if(currentUserGuess > correctNumber){
    document.getElementById("guessFeedback").innerHTML = "Your guess is <b>too high!</b>";
  }
}

function createHarderRange(){
  min_num = (min_num - 10);
  max_num = (max_num + 10);
  setFormNumberRange();
  correctNumber = generateRandomNumber(min_num, max_num);
}

submitGuessButton.addEventListener('click',processGuess);
clearGuessButton.addEventListener('click',clearGuessInput);
resetGameButton.addEventListener('click',resetCurrentGame);
submitRangeButton.addEventListener('click',processRangeChange);
