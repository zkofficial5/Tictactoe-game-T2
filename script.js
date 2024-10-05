document.addEventListener('DOMContentLoaded', () => {
  const btnRef = document.querySelectorAll(".button-option");
  const popupRef = document.querySelector(".popup");
  const newgameBtn = document.getElementById("new-game");
  const restartBtn = document.getElementById("restart");
  const msgRef = document.getElementById("message");
  const playerForm = document.getElementById("player-form");
  const gameRef = document.getElementById("game");
  const startGameBtn = document.getElementById("start-game");

  let playerX, playerO;
  const winningPattern = [
      [0, 1, 2],
      [0, 3, 6],
      [2, 5, 8],
      [6, 7, 8],
      [3, 4, 5],
      [1, 4, 7],
      [0, 4, 8],
      [2, 4, 6]
  ];
  let xTurn = true;
  let count = 0;

  // for disabling All Buttons
  const disableButtons = () => {
      btnRef.forEach((element) => element.disabled = true);
      popupRef.classList.remove("hide");
  };

  // enable all buttons when new game start 
  const enableButtons = () => {
      btnRef.forEach((element) => {
          element.innerText = "";
          element.disabled = false;
      });
      popupRef.classList.add("hide");
      xTurn = true;
      count = 0;
  };

  // for the function to check for a win
  const winFunction = (letter) => {
      disableButtons();
      if (letter === "X") {
          msgRef.innerHTML = `&#x1F389; <br> ${playerX} Wins!`;
      } else {
          msgRef.innerHTML = `&#x1F389; <br> ${playerO} Wins!`;
      }
  };

  // function for a draw
  const drawFunction = () => {
      disableButtons();
      msgRef.innerHTML = `&#x1F60E; <br> It's a Draw between ${playerX} and ${playerO}`;
  };

  // starting game with player Names
  startGameBtn.addEventListener("click", () => {
      playerX = document.getElementById("playerX").value.trim() || "Player 1";
      playerO = document.getElementById("playerO").value.trim() || "Player 2";

      if (playerX && playerO) {
          // hiding the form and showing the game
          playerForm.classList.add("hide");
          gameRef.classList.remove("hide");
          enableButtons();
      } else {
          alert('Please enter names for both players.');
      }
  });

  // new Game
  newgameBtn.addEventListener("click", enableButtons);

  // restart Game
  restartBtn.addEventListener("click", enableButtons);

  // for win Logic
  const winChecker = () => {
      for (let i of winningPattern) {
          const [a, b, c] = [
              btnRef[i[0]].innerText,
              btnRef[i[1]].innerText,
              btnRef[i[2]].innerText
          ];
          if (a !== "" && a === b && b === c) {
              winFunction(a);
              return;
          }
      }
      // check for a draw if all buttons are clicked
      if (count === 9) {
          drawFunction();
      }
  };

  // button click event to display X/O
  btnRef.forEach((element) => {
      element.addEventListener("click", () => {
          if (element.innerText === "") {
              element.innerText = xTurn ? "X" : "O";
              xTurn = !xTurn;
              count += 1;
              winChecker();
          }
      });
  });

  // enable Buttons on page load
  window.onload = () => {
      gameRef.classList.add("hide"); // hiding the game board initially
  };
});
