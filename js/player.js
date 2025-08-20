import { Sprite, keyPressed } from "./kontra.min.mjs";

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

  update(tilePosition){
     if(this.sprite.y > 368){
        this.sprite.y = 368;
        this.isJumping = false;
        this.sprite.dy = 0;
    }else{
        this.sprite.dy=2;
    }
    if(keyPressed('space') && !this.isJumping){
        this.sprite.y -= 25;
        this.isJumping = true;
    }
   
    this.sprite.update();
  }

  render() {
    this.sprite.render();
  }

}