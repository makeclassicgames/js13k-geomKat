import { Sprite, keyPressed } from "./kontra.min.mjs";
import { levelsManager } from "./levelData.js";

const INITIAL_JUMP_FORCE = 3;
const GRAVITY = 3;
const MAX_X_VELOCITY = 1;
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
    });
  }

  getPosition() {
    const pos = {
      x: this.sprite.x,
      y: this.sprite.y
    };
    return pos; // Returns the current position of the player sprite
  }

  setPosition(x, y) {
    this.sprite.x = x;
    this.sprite.y = y;
  }

  getCurrentTile(levelIndex) {
    const tileEngine = levelsManager.getLevel(levelIndex);
    return tileEngine.tileAtLayer("ground", {x: this.sprite.x, y: this.sprite.y + this.sprite.height});
  }

  // Using dt (delta time) in physics calculations because of colliding issues
  update(dt, levelIndex) {
    const isColliding = levelsManager.layerCollidesWith(
      levelIndex,
      this.sprite
    );
    const tileEngine = levelsManager.getLevel(levelIndex);

    // Move camera along with the player
    tileEngine.sx += this.sprite.dx;


    // Ground collision
    if (isColliding) {
      this.sprite.dy = 0;
      const currentTile = tileEngine.tileAtLayer("ground", {x: this.sprite.x, y: this.sprite.y + this.sprite.height});
      console.log(currentTile);
      this.isJumping = false;
      this.sprite.drotation = 0;
      this.sprite.rotation = 0;
      // Move the player when is grounded
      this.horizontalMovement(dt);
    } else {
      this.sprite.dy += GRAVITY * dt;
    }

    // Jump when space is pressed and not already jumping
    if (keyPressed("space") && !this.isJumping) {
      this.sprite.dy -= INITIAL_JUMP_FORCE;
      this.sprite.drotation = (-Math.PI / 4)*dt;

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
