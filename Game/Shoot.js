export default class Shoot {
  constructor(canvas, x, y, velocity, shootColor) {
    this.canvas = canvas;
    this.x = x;
    this.y = y;
    this.velocity = velocity;
    this.shootColor = shootColor;
    this.width = 5;
    this.height = 20;
  }

  draw(ctx) {
    this.y -= this.velocity;
    ctx.fillStyle = this.shootColor;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  collideWith(sprite) {
    if (
      this.x + this.width > sprite.x &&
      this.x < sprite.x + sprite.width &&
      this.y + this.height > sprite.y &&
      this.y < sprite.y + sprite.height
    ) {
      return true;
    } else {
      return false;
    }
  }
}