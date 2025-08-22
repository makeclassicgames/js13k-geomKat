import { Sprite, keyPressed } from "./kontra.min.mjs";
import { levelsManager, LevelsManager } from "./levelData.js";


const INITIAL_JUMP_FORCE = 16;
const GRAVITY = 2;
export class Player {
  sprite;
  isJumping = false;
  constructor(x, y) {

    this.sprite = Sprite({
      x: x,
      y: y,
      color: 'blue',
      width: 16,
      height: 16,
      anchor: {x: 1, y: 2},
    });
  }

  getPosition() {
    return this.sprite.position; // Returns the current position of the player sprite
  }

  setPosition(x, y) {
    this.sprite.x = x;
    this.sprite.y = y;
  }

  update(levelIndex) {

    this.sprite.dy += GRAVITY;
    const collides = levelsManager.getColliderPosition(levelIndex,this.sprite);
     // Ground collision
    if (collides) {

        this.sprite.dy = 0;
     
      this.isJumping = false;
     
    }

    // Jump when space is pressed and not already jumping
    if (keyPressed('space') && !this.isJumping) {
      this.sprite.dy = -INITIAL_JUMP_FORCE;
      this.isJumping = true;
    }

    
   
    // Update position
    this.sprite.y += this.sprite.dy;
    this.sprite.update();
  }

  render() {
    this.sprite.render();
  }

}