import { TileEngineClass } from "./kontra.min.mjs";



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
            throw new Error("Level not found");
        }
        return level.getTile(x / level.tileWidth, y / level.tileHeight);
    }
};

export const levelsManager = new LevelsManager();