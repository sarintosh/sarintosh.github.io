import Shoot from "./Shoot.js";

export default class ShootController {
  shoots = [];
  timeTillNextShootAllowed = 0;

  constructor(canvas, maxShootsAtATime, shootColor, soundEnabled) {
    this.canvas = canvas;
    this.maxShootsAtATime = maxShootsAtATime;
    this.shootColor = shootColor;
    this.soundEnabled = soundEnabled;

    this.shootSound = new Audio("game/sounds/laser_sound.wav");
    this.shootSound.volume = 0.1;
  }

  draw(ctx) {
    this.shoots = this.shoots.filter(
      (shoot) => shoot.y + shoot.width > 0 && shoot.y <= this.canvas.height
    );

    this.shoots.forEach((shoot) => shoot.draw(ctx));
    if (this.timeTillNextShootAllowed > 0) {
      this.timeTillNextShootAllowed--;
    }
  }

  collideWith(sprite) {
    const shootThatHitSpriteIndex = this.shoots.findIndex((shoot) =>
    shoot.collideWith(sprite)
    );

    if (shootThatHitSpriteIndex >= 0) {
      this.shoots.splice(shootThatHitSpriteIndex, 1);
      return true;
    }

    return false;
  }

  shoot(x, y, velocity, timeTillNextShootAllowed = 0) {
    if (
      this.timeTillNextShootAllowed <= 0 &&
      this.shoots.length < this.maxShootsAtATime
    ) {
      const shoot = new Shoot(this.canvas, x, y, velocity, this.shootColor);
      this.shoots.push(shoot);
      if (this.soundEnabled) {
        this.shootSound.currentTime = 0;
        this.shootSound.play();
      }
      this.timeTillNextShootAllowed = timeTillNextShootAllowed;
    }
  }
}