import { Sprite, keyPressed } from "./kontra.min.mjs";
import { levelsManager, LevelsManager } from "./levelData.js";

const INITIAL_JUMP_FORCE = 4;
const GRAVITY = 3;
const MAX_X_VELOCITY = 0.5;
export class Player {
  sprite;
  isJumping = false;
  firstGround = false;
  constructor(x, y) {
    this.sprite = Sprite({
      x: x,
      y: y,
      color: "blue",
      width: 16,
      height: 16,
      anchor: { x: 1, y: 2 },
    });
  }

  getPosition() {
    return this.sprite.position; // Returns the current position of the player sprite
  }

  setPosition(x, y) {
    this.sprite.x = x;
    this.sprite.y = y;
  }

  // Using dt (delta time) in physics calculations because of colliding issues
  update(dt, levelIndex) {
    const isColliding = levelsManager.layerCollidesWith(levelIndex, this.sprite);
    const tileEngine = levelsManager.getLevel(levelIndex);

    // Move camera along with the player
    tileEngine.sx += this.sprite.dx;

    // Ground collision
    if (isColliding) {
      this.sprite.dy = 0;

      this.isJumping = false;

      // Move the player when is grounded
      this.horizontalMovement(dt);
    } else {
      this.sprite.dy += GRAVITY * dt;
    }

    // Jump when space is pressed and not already jumping
    if (keyPressed("space") && !this.isJumping) {
      this.sprite.dy -= INITIAL_JUMP_FORCE;

      this.isJumping = true;
    }

    // Update position
    this.sprite.update();
  }

  render() {
    this.sprite.render();
  }

  horizontalMovement(dt) {
    this.sprite.dx += 1 * dt;
    if (this.sprite.dx >= MAX_X_VELOCITY) this.sprite.dx = MAX_X_VELOCITY;
  }
}
