// Function for generating a random string with the specified parameters
function generateCaptcha(length, includeNumbers, includeUppercase, includeLowercase) {
  let characters = '';
  if (includeNumbers) characters += '0123456789';
  if (includeUppercase) characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (includeLowercase) characters += 'abcdefghijklmnopqrstuvwxyz';

  let captcha = '';
  for (let i = 0; i < length; i++) {
    captcha += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return captcha;
}

// Update captcha
function refreshCaptcha() {
  const captchaLength = parseInt(document.getElementById('captcha-length').value);
  const includeNumbers = document.getElementById('number').checked;
  const includeUppercase = document.getElementById('uppercase').checked;
  const includeLowercase = document.getElementById('lowercase').checked;

  const captchaText = generateCaptcha(captchaLength, includeNumbers, includeUppercase, includeLowercase);
  document.getElementById('captcha-display').textContent = captchaText;
  document.getElementById('captcha-input').value = '';

// Distort captcha
  distortCaptcha();
}

// Slider position change handler
document.getElementById('captcha-length').addEventListener('input', function() {
  const lengthValue = document.getElementById('captcha-length').value;
  document.getElementById('captcha-length-value').textContent = lengthValue;
});

// Generate a new captcha when the "Generate" button is clicked
document.getElementById('refresh-btn').addEventListener('click', function(event) {
  event.preventDefault();
  refreshCaptcha();
});

// Check captcha when "Submit" button is clicked
document.getElementById('submit-btn').addEventListener('click', function(event) {
  event.preventDefault();

  const captchaText = document.getElementById('captcha-display').textContent;
  const userInput = document.getElementById('captcha-input').value;

  if (captchaText === '' || userInput === '') {
    alert('Error: Invalid data!');
  } else if (userInput === captchaText) {
    alert('Verification passed!');
    document.getElementById('captcha-input').value = '';

    // Clear input field and save captcha
    document.getElementById('captcha-display').textContent = '';

    // Show "Click Generate button" text after clearing
    showPlaceholderText();
  } else {
    alert('Error: Incorrect captcha!');
  }
});


// Clearing the input field and captcha when the "Clear" button is clicked
document.getElementById('clear-btn').addEventListener('click', function() {
  document.getElementById('captcha-display').textContent = '';
  document.getElementById('captcha-input').value = '';
});


// Limit captcha input length
document.getElementById('captcha-input').addEventListener('input', function(event) {
  const captchaLength = parseInt(document.getElementById('captcha-length').value);
  const userInput = document.getElementById('captcha-input').value;

  if (userInput.length > captchaLength) {
    event.preventDefault();
    document.getElementById('captcha-input').value = userInput.slice(0, captchaLength);
  }
});


// Function to distort captcha text
function distortCaptcha() {
  const captchaText = document.getElementById('captcha-display').textContent;
  const captchaContainer = document.getElementById('captcha-display');

  // Clearing the captcha container
  while (captchaContainer.firstChild) {
    captchaContainer.firstChild.remove();
  }

  // Distortion of each character and adding to the captcha container
  for (let i = 0; i < captchaText.length; i++) {
    const char = captchaText.charAt(i);
    const distortedChar = document.createElement('span');
    distortedChar.textContent = char;

    // Generate a random rotation angle
    const angle = Math.random() * 75 - 45; // -35 to 35 degrees

    // Apply character rotation
    distortedChar.style.transform = `rotate(${angle}deg)`;

    captchaContainer.appendChild(distortedChar);
  }
}

// Apply captcha text distortion on page load
window.addEventListener('load', function() {
  distortCaptcha();
});

// Apply captcha text distortion when clicking "Generate captcha" button
document.getElementById('refresh-btn').addEventListener('click', function() {
  distortCaptcha();
});


// Function to add the text "Click Generate button" to the captcha field on page load
function addPlaceholderText() {
  const captchaDisplay = document.getElementById('captcha-display');
  const placeholderText = document.createElement('span');
  placeholderText.textContent = 'Click Generate button';
  placeholderText.classList.add('span');
  placeholderText.style.color = '#ffffff80';
  placeholderText.style.fontSize = '16px';
  placeholderText.style.textTransform = 'uppercase';
  captchaDisplay.appendChild(placeholderText);
}

// Function to hide the text "Click Generate button" when generating captcha
function hidePlaceholderText() {
  const captchaDisplay = document.getElementById('captcha-display');
  const placeholderText = captchaDisplay.querySelector('.span');
  if (placeholderText) {
    placeholderText.style.display = 'none';
  }
}

// Function for displaying the text "Click Generate button" when clearing the captcha
function showPlaceholderText() {
  const captchaDisplay = document.getElementById('captcha-display');
  const placeholderText = captchaDisplay.querySelector('.span');
  if (!placeholderText) {
    const newPlaceholderText = document.createElement('span');
    newPlaceholderText.textContent = 'Click Generate button';
    newPlaceholderText.classList.add('span');
    newPlaceholderText.style.color = '#ffffff80';
    newPlaceholderText.style.fontSize = '16px';
    newPlaceholderText.style.textTransform = 'uppercase';
    captchaDisplay.appendChild(newPlaceholderText);
  } else {
    placeholderText.style.display = 'block';
  }
}

// Call the "Click Generate button" add text function on page load
window.addEventListener('load', function() {
  addPlaceholderText();
});

// Click event handler for the "Generate" button
document.getElementById('refresh-btn').addEventListener('click', function() {
  hidePlaceholderText();

  // Generating captcha after hiding the text
  refreshCaptcha();
});

// Click event handler for the "Clear" button
document.getElementById('clear-btn').addEventListener('click', function() {
  showPlaceholderText();
});



// Change the color of the strip to the left of the slider
function changeSliderColor() {
  const slider = document.getElementById('captcha-length');
  const value = (slider.value - slider.min) / (slider.max - slider.min) * 100;

  slider.style.background = `linear-gradient(to right, #41441f 0%, #99950a ${value}%, #72747f ${value}%, #72747f 100%)`;
}

// Slider position change handler
document.getElementById('captcha-length').addEventListener('input', function() {
  const lengthValue = document.getElementById('captcha-length').value;
  document.getElementById('captcha-length-value').textContent = lengthValue;

  changeSliderColor();
});
