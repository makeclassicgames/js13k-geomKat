/*
  Boing Kat - A simple platformer game made with Kontra.js with Mit License.
  https://github.com/makeclassicgames/BoingKat
  levelDataJS - Level management and tile categories
*/
import { TileEngineClass } from "./kontra.min.mjs";

//Tile Categories
export const TilesCategory={
    EMPTY:1, //No Tile
    GROUND: 2,//Ground and Platforms
    SPIKES: 3,//Spikes
    SPIKES2: 4//Spikes 2
};


export class LevelsManager {
    constructor() {
        this.levels = [];
    }

    addLevel(level) {
        this.levels.push(level);
    }

    getLevel(index) {
        if (index < 0 || index >= this.levels.length) {
            //throw new Error("Level index out of bounds");
            return null;
        }
        return this.levels[index];
    }

    getLevelPositionTile(levelIndex, x, y) {
        const level = this.getLevel(levelIndex);
        if (!level) {
            //throw new Error("Level not found");
            return null;
        }
        let data = {x: x , y: y };
        
        return level.tileAtLayer('ground', data);
    }
    layerCollidesWith(levelIndex,sprite){
        const level = this.getLevel(levelIndex);
        if (!level) {
            //throw new Error("Level not found");
            return null;
        }
        
        return level.layerCollidesWith('ground', sprite);
    }
};

export const levelsManager = new LevelsManager();