export default class Rocket {
  rightPressed = false;
  leftPressed = false;
  shootPressed = false;

  constructor(canvas, velocity, shootController, initialLives) {
    this.canvas = canvas;
    this.velocity = velocity;
    this.shootController= shootController;
    this.initialLives = initialLives;
    this.lives = initialLives;
    this.x = this.canvas.width / 2;
    this.y = this.canvas.height - 75;
    this.width = 50;
    this.height = 48;
    this.image = new Image();
    this.image.src = "game/assets/space_ship.png";
    document.addEventListener("keydown", this.keydown);
    document.addEventListener("keyup", this.keyup);
  }

  draw(ctx) {
    if (this.shootPressed) {
      this.shootController.shoot(this.x + this.width / 2, this.y, 4, 10);
    }
    this.move();
    this.collideWithWalls();
    this.drawLives(ctx);
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  drawLives(ctx) {
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText(`Lives: ${this.lives}`, this.canvas.width - 100, 30);
  }

  resetLives() {
    this.lives = this.initialLives;
    this.isGameOver = false;
  }

  collideWithWalls() {
    //izquierda
    if (this.x < 0) {
      this.x = 0;
    }

    //derecha
    if (this.x > this.canvas.width - this.width) {
      this.x = this.canvas.width - this.width;
    }
  }

  move() {
    if (this.rightPressed) {
      this.x += this.velocity;
    } else if (this.leftPressed) {
      this.x += -this.velocity;
    }
  }

  decrementLives() {
    this.lives--;
  }
  
  keydown = (event) => {
    if (event.code == "ArrowRight") {
      this.rightPressed = true;
    }
    if (event.code == "ArrowLeft") {
      this.leftPressed = true;
    }
    if (event.code == "Space") {
      this.shootPressed = true;
    }
  };

  keyup = (event) => {
    if (event.code == "ArrowRight") {
      this.rightPressed = false;
    }
    if (event.code == "ArrowLeft") {
      this.leftPressed = false;
    }
    if (event.code == "Space") {
      this.shootPressed = false;
    }
  };
}
//  this.rocketDeathSound.currentTime = 0;
//this.rocketDeathSound.play();