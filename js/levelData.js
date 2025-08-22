import { TileEngineClass } from "./kontra.min.mjs";

export const TilesCategory={
    EMPTY:1,
    GROUND: 2,
    SPIKES: 3
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
    getColliderPosition(levelIndex,sprite){
        const level = this.getLevel(levelIndex);
        if (!level) {
            //throw new Error("Level not found");
            return null;
        }
        
        return level.layerCollidesWith('ground', sprite);
    }
};

export const levelsManager = new LevelsManager();