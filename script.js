let secretCode = generateCode();
let attempts = 0;
const maxAttempts = 10;

function generateCode() {
  let digits = [];
  while (digits.length < 3) {
    let digit = Math.floor(Math.random() * 10).toString();
    if (!digits.includes(digit)) {
      digits.push(digit);
    }
  }
  return digits.join('');
}

function submitGuess() {
  const guessInput = document.getElementById('guess');
  const guess = guessInput.value;
  guessInput.value = ''; // Clear input after submission

  if (guess.length !== 3 || isNaN(guess)) {
    alert("Please enter a valid 3-digit number.");
    return;
  }

  attempts++;
  if (attempts > maxAttempts) {
    document.getElementById('result').innerHTML = `Game Over! The code was ${secretCode}`;
    return;
  }

  const hint = checkGuess(guess);
  displayGuessWithHint(guess, hint);

  if (guess === secretCode) {
    document.getElementById('result').innerHTML = "Congratulations! You've cracked the code!";
  } else if (attempts === maxAttempts) {
    document.getElementById('result').innerHTML = `Game Over! The code was ${secretCode}`;
  }
}

function checkGuess(guess) {
  let correctPosition = 0;
  let correctNumber = 0;

  for (let i = 0; i < 3; i++) {
    if (guess[i] === secretCode[i]) {
      correctPosition++;
    } else if (secretCode.includes(guess[i])) {
      correctNumber++;
    }
  }

  return `${correctPosition} number(s) are correct and well placed, ${correctNumber} number(s) are correct but wrongly placed.`;
}

function displayGuessWithHint(guess, hint) {
  const hintsDiv = document.getElementById('hints');

  // Create a container for the current attempt's digits
  const hintContainer = document.createElement('div');
  hintContainer.classList.add('hint-container');

  // Create digit boxes for each number in the guess
  for (let i = 0; i < guess.length; i++) {
    const digitBox = document.createElement('div');
    digitBox.classList.add('digit-box');
    digitBox.innerText = guess[i];
    hintContainer.appendChild(digitBox);
  }

  // Append the hintContainer to the hints div
  hintsDiv.appendChild(hintContainer);

  // Create and append the hint text
  const hintText = document.createElement('p');
  hintText.classList.add('hint-text');
  hintText.innerText = hint;
  hintsDiv.appendChild(hintText);
}
