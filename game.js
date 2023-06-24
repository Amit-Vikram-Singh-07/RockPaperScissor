let playerMove = "",
  computerMove = "",
  result = "";

let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

/*
      if (!score) {
        score = {
          wins: 0,
          losses: 0,
          ties: 0
        };
      }
      */

function pickComputerMove() {
  const randNum = Math.random();
  if (randNum > 0 && randNum <= 1 / 3) computerMove = "rock";
  else if (randNum > 1 / 3 && randNum <= 2 / 3) computerMove = "paper";
  else computerMove = "scissor";
  return computerMove;
}

function playGame(playerMove) {
  computerMove = pickComputerMove();
  if (playerMove == "rock") {
    if (computerMove == "rock") result = "Match tie.";
    else if (computerMove == "paper") result = "You lost.";
    else result = "You win.";
  } else if (playerMove == "paper") {
    if (computerMove == "paper") result = "Match tie.";
    else if (computerMove == "scissor") result = "You lost.";
    else result = "You win.";
  } else {
    if (computerMove == "scissor") result = "Match tie.";
    else if (computerMove == "rock") result = "You lost.";
    else result = "You win.";
  }

  if (result === "You win.") score.wins++;
  else if (result === "You lost.") score.losses++;
  else score.ties++;

  localStorage.setItem("score", JSON.stringify(score));
  updateMoves();
  updateResult();
  updateScoreElement();
  // alert(
  //   `Your move : ${playerMove}\nComputer move : ${computerMove}\n Result : ${result}\n wins : ${score.wins}, losses : ${score.losses}, ties : ${score.ties}`
  // );
}

function updateScoreElement() {
  document.querySelector(
    ".js-score"
  ).innerHTML = `wins : ${score.wins}, losses : ${score.losses}, ties : ${score.ties}`;
}
function updateMoves() {
  document.querySelector(
    ".js-moves"
  ).innerHTML = `Your move : <img src="icons/${playerMove}-emoji.png" alt="" class="move-icon">  Computer move : <img src="icons/${computerMove}-emoji.png" alt="" class="move-icon">`;
}
function updateResult() {
  document.querySelector(".js-result").innerHTML = `Result : ${result}`;
}

function reset() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem("score");
  document.querySelector(".js-moves").innerHTML = ``;
  document.querySelector(".js-result").innerHTML = ``;
  updateScoreElement();
}
