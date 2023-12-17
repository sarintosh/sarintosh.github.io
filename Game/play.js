// index.js
import InvaderController from "./InvaderController.js";
import Rocket from "./Rocket.js";
import ShootController from "./ShootController.js";
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 600;

// FONDO
const background = new Image();
background.src = "Game/assets/game_background.jpg";
const gameSound = new Audio("Game/sounds/suits-you.mp3");

// GAMEOVER
const gameOverImage = new Image();
gameOverImage.src = "Game/assets/game_over.png"; // Ruta de la imagen de Game Over
const gameOverSound = new Audio("Game/sounds/game_over.mp3");
const rocketShootController = new ShootController(canvas, 10, "red", true);
const invaderShootController = new ShootController(canvas, 4, "blue", false);
const invaderController = new InvaderController(
  canvas,
  invaderShootController,
  rocketShootController
);
const rocket = new Rocket(canvas, 3, rocketShootController, 5); // Pasar 5 como initialLives

let isGameOver = false;
let didWin = false;

function game() {
  if (isGameOver) {
    resetLives();
    isGameOver = false;
  }
  checkGameOver();
  
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  displayGameOver();
  if (!isGameOver) {
    gameSound.play(3);
    invaderController.draw(ctx);
    rocket.draw(ctx);
    rocketShootController.draw(ctx);
    invaderShootController.draw(ctx);
  }
}

function displayGameOver() {
  if (isGameOver) {
    let image = didWin ? null : gameOverImage;

    if (didWin) {
      ctx.fillStyle = "white";
      ctx.font = "70px Arial";
      ctx.fillText("You Win", canvas.width / 3.5, canvas.height / 2);
    } else {
      const imageWidth = canvas.width / 2.2;
      const imageHeight = canvas.height / 2;
      const x = (canvas.width - imageWidth) / 2;
      const y = canvas.height / 4;

      ctx.drawImage(image, x, y, imageWidth, imageHeight);
      
      gameOverSound.currentTime = 0;
      gameOverSound.play();
    }
  }
}

function resetLives() {
  rocket.resetLives(); // Utiliza el método de resetLives de la clase Rocket
}

function checkGameOver() {
  if (rocket.isGameOver) {
    isGameOver = false;
    rocket.resetLives(); // Restablece las vidas del jugador
    invaderController.resetInvaders(); // Crea nuevos enemigos
    return;
  }

  if (invaderShootController.collideWith(rocket)) {

    rocket.decrementLives();
    if (rocket.lives === 0) {
      rocket.isGameOver = true;
    }
  }

  if (invaderController.collideWith(rocket)) {
    rocket.decrementLives();
    if (rocket.lives === 0) {
      rocket.isGameOver = true;
    }
  }

  if (invaderController.invaderRows.length === 0) {
    didWin = true;
    rocket.isGameOver = true;
  }
}

setInterval(game, 1000 / 60);
