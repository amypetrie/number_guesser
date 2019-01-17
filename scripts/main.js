var submitGuessButton = document.getElementById("submitGuess");
var min_num = 0;
var max_num = 100;
var correctNumber = generateRandomNumber(min_num, max_num);
var currentUserGuess;

function displayGuess(){
  currentUserGuess = document.getElementById("userGuessInput").value;
  document.getElementById("mostRecentGuess").innerHTML = `You guessed ${currentUserGuess}`;
  displayGuessFeedback();
}

function displayGuessFeedback() {
  if(currentUserGuess == correctNumber){
    document.getElementById("guessFeedback").innerHTML = "BOOM!";
  } 
  else if(currentUserGuess < min_num || currentUserGuess > max_num){
    document.getElementById("guessFeedback").innerHTML = "Your guess is out of range!";
  }
  else if(currentUserGuess < correctNumber){
    document.getElementById("guessFeedback").innerHTML = "Your guess is too low!";
  }
  else if(currentUserGuess > correctNumber){
    document.getElementById("guessFeedback").innerHTML = "Your guess is too high!";
  }
}

function generateRandomNumber(min, max){
  let result = Math.random() * (max-min) + min;
  return Math.floor(result);
}

submitGuessButton.addEventListener('click',displayGuess);
