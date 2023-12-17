import Invader from "./Invader.js";
import MovingDirection from "./MovingDirection.js";

export default class InvaderController {
  invaderMap = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [2, 2, 2, 3, 3, 3, 3, 2, 2, 2],
    [2, 2, 2, 3, 3, 3, 3, 2, 2, 2],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  ];
  invaderRows = [];

  currentDirection = MovingDirection.right;
  xVelocity = 0;
  yVelocity = 0;
  defaultXVelocity = 1;
  defaultYVelocity = 1;
  moveDownTimerDefault = 30;
  moveDownTimer = this.moveDownTimerDefault;
  fireBulletTimerDefault = 100;
  fireBulletTimer = this.fireBulletTimerDefault;

  constructor(canvas, invaderShootController, rocketShootController) {
    this.canvas = canvas;
    this.invaderShootController = invaderShootController;
    this.rocketShootController = rocketShootController;

    this.invaderDeathSound = new Audio("game/sounds/enemy-death.wav");
    this.invaderDeathSound.volume = 0.1;

    this.rocketDeathSound = new Audio("/Game/sounds/hurt.mp3");
    this.rocketDeathSound.volume = 0.1;

    this.createInvaders();
  }

  draw(ctx) {
    this.decrementMoveDownTimer();
    this.updateVelocityAndDirection();
    this.collisionDetection();
    this.drawInvaders(ctx);
    this.resetMoveDownTimer();
    this.fireBullet();
  }

  collisionDetection() {
    this.invaderRows.forEach((invaderRow) => {
      invaderRow.forEach((invader, invaderIndex) => {
        if (this.rocketShootController.collideWith(invader)) {
          this.invaderDeathSound.currentTime = 0;
          this.invaderDeathSound.play();
          invaderRow.splice(invaderIndex, 1);
        }
      });
    });

    this.invaderRows = this.invaderRows.filter((invaderRow) => invaderRow.length > 0);
  }

  fireBullet() {
    this.fireBulletTimer--;
    if (this.fireBulletTimer <= 0) {
      this.fireBulletTimer = this.fireBulletTimerDefault;
      const allInvaders = this.invaderRows.flat();
      const invaderIndex = Math.floor(Math.random() * allInvaders.length);
      const invader = allInvaders[invaderIndex];
      this.invaderShootController.shoot(invader.x + invader.width / 2, invader.y, -3);
    }
  }

  resetMoveDownTimer() {
    if (this.moveDownTimer <= 0) {
      this.moveDownTimer = this.moveDownTimerDefault;
    }
  }

  decrementMoveDownTimer() {
    if (
      this.currentDirection === MovingDirection.downLeft ||
      this.currentDirection === MovingDirection.downRight
    ) {
      this.moveDownTimer--;
    }
  }

  updateVelocityAndDirection() {
    for (const invaderRow of this.invaderRows) {
      if (this.currentDirection == MovingDirection.right) {
        this.xVelocity = this.defaultXVelocity;
        this.yVelocity = 0;
        const rightMostInvader = invaderRow[invaderRow.length - 1];
        if (rightMostInvader.x + rightMostInvader.width >= this.canvas.width) {
          this.currentDirection = MovingDirection.downLeft;
          break;
        }
      } else if (this.currentDirection === MovingDirection.downLeft) {
        if (this.moveDown(MovingDirection.left)) {
          break;
        }
      } else if (this.currentDirection === MovingDirection.left) {
        this.xVelocity = -this.defaultXVelocity;
        this.yVelocity = 0;
        const leftMostInvader = invaderRow[0];
        if (leftMostInvader.x <= 0) {
          this.currentDirection = MovingDirection.downRight;
          break;
        }
      } else if (this.currentDirection === MovingDirection.downRight) {
        if (this.moveDown(MovingDirection.right)) {
          break;
        }
      }
    }
  }

  moveDown(newDirection) {
    this.xVelocity = 0;
    this.yVelocity = this.defaultYVelocity;
    if (this.moveDownTimer <= 0) {
      this.currentDirection = newDirection;
      return true;
    }
    return false;
  }

  drawInvaders(ctx) {
    this.invaderRows.flat().forEach((invader) => {
      invader.move(this.xVelocity, this.yVelocity);
      invader.draw(ctx);
    });
  }

  happy = () => {};

  createInvaders() {
    this.invaderMap.forEach((row, rowIndex) => {
      this.invaderRows[rowIndex] = [];
      row.forEach((invaderNumber, invaderIndex) => {
        if (invaderNumber > 0) {
          this.invaderRows[rowIndex].push(
            new Invader(invaderIndex * 50, rowIndex * 35, invaderNumber)
          );
        }
      });
    });
  }

  collideWith(sprite) {
    return this.invaderRows.flat().some((invader) => invader.collideWith(sprite));
  }

  resetInvaders() {
    this.invaderRows = [];
    this.createInvaders();
  }

  resetPosition() {
    this.x = this.initialX;
    this.y = this.initialY;
  }
}
