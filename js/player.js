import { Sprite, keyPressed } from "./kontra.min.mjs";


const INITIAL_JUMP_FORCE = 10;
const GRAVITY = 1;
export class Player {
    sprite;
    isJumping=false;
  constructor(x,y) {

    this.sprite = Sprite({
      x: x,
      y: y,
      color: 'blue',
      width: 16,
      height: 16
    });
  }

  getPosition(){
    return {
      x: this.sprite.x,
      y: this.sprite.y
    };
  }

  update(){


    // Apply gravity if jumping
    if (this.isJumping) {
      this.sprite.dy += GRAVITY;
    } else {
      this.sprite.dy = 0;
    }

    // Jump when space is pressed and not already jumping
    if (keyPressed('space') && !this.isJumping) {
      this.sprite.dy = -INITIAL_JUMP_FORCE;
      this.isJumping = true;
    }

    // Update position
    this.sprite.y += this.sprite.dy;

    // Ground collision
    if (this.sprite.y >= 368) {
      this.sprite.y = 368;
      this.isJumping = false;
      this.sprite.dy = 0;
    }
   
    this.sprite.update();
  }

  render() {
    this.sprite.render();
  }

}