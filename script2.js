document.addEventListener("DOMContentLoaded", function () {
  const choices = ["rock", "paper", "scissors"];
  const emojiMap = {
    rock: "✊",
    paper: "✋",
    scissors: "✌️"
  };
  const animationContainer = document.getElementById('animation');
  let animationInterval;

  document.getElementById("rock").addEventListener("click", function () {
    playGame("rock");
  });

  document.getElementById("paper").addEventListener("click", function () {
    playGame("paper");
  });

  document.getElementById("scissors").addEventListener("click", function () {
    playGame("scissors");
  });

  function playGame(playerChoice) {
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    const animationDiv = document.getElementById("animation");
    const resultDiv = document.getElementById("result");

    clearInterval(animationInterval);
    let currentIndex = 0;

    animationInterval = setInterval(() => {
      animationDiv.textContent = emojiMap[choices[currentIndex]];
      currentIndex = (currentIndex + 1) % choices.length;
    }, 100);

    setTimeout(() => {
      clearInterval(animationInterval);
      animationDiv.textContent = emojiMap[computerChoice];
      displayResult(playerChoice, computerChoice);
    }, 1500);
  }

  function displayResult(playerChoice, computerChoice) {
    let result = "";

    if (playerChoice === computerChoice) {
      result = "It's a draw!";
    } else if (
      (playerChoice === "rock" && computerChoice === "scissors") ||
      (playerChoice === "paper" && computerChoice === "rock") ||
      (playerChoice === "scissors" && computerChoice === "paper")
    ) {
      result = `You win! ${emojiMap[playerChoice]} beats ${emojiMap[computerChoice]}.`;
      triggerFireworks();
    } else {
      result = `You lose! ${emojiMap[computerChoice]} beats ${emojiMap[playerChoice]}.`;
      triggerLossBackground();
    }

    document.getElementById("result").textContent = result;
  }

  function triggerFireworks() {
    const fireworksContainer = document.getElementById("fireworks-container");
    fireworksContainer.innerHTML = ""; // Clear any existing fireworks

    for (let i = 0; i < 10; i++) {
      // Generate 10 fireworks
      const firework = document.createElement("div");
      firework.className = "firework";
      firework.style.left = `${Math.random() * 100}%`;
      firework.style.top = `${Math.random() * 100}%`;
      firework.style.animationDelay = `${Math.random() * 0.5}s`;

      fireworksContainer.appendChild(firework);

      // Remove the firework after animation ends
      setTimeout(() => {
        firework.remove();
      }, 1000);
    }
  }
  
  function triggerLossBackground() {
        animationContainer.style.backgroundColor = 'red';

        // Revert the background color to original after 1 second
        setTimeout(() => {
            animationContainer.style.backgroundColor = '';
        }, 1000);
    }

    function resetBackgroundColor() {
        animationContainer.style.backgroundColor = '';
    }
  
});