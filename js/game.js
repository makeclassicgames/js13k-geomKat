// game.js
import { init, Sprite, TileEngine, initKeys, keyPressed, GameLoop } from './kontra.min.mjs';

import { Player } from './player.js';

import { levelsManager, LevelsManager } from './levelData.js';

import levels from './level1.json' with {type: 'json'};

let { canvas } = init();

const states = {
    menu: 0,
    playing: 1,
    gameOver: 2
};

const game = {
    currentLevel: 0,
    state: states.menu,
    player: new Player(100, 100)
};




let img = new Image();
img.src = 'assets/tilescat.png';
img.onload = function () {
    let tileEngine = TileEngine({
        // tile size
        tilewidth: 16,
        tileheight: 16,

        // map size in tiles
        width: 64,
        height: 32,

        // tileset object
        tilesets: [{
            firstgid: 1,
            image: img
        }],

        // layer object
        layers: [{
            name: 'ground',
            data: levels.layers[0].data
        }]
    });

    levelsManager.addLevel(tileEngine);
};





initKeys(); // initialize the keyboard input
let loop = GameLoop({  // create the main game loop
    update: function () { // update the game state

        let level = levelsManager.getLevel(game.currentLevel);
        if (level) {
            level.sx++;
            if (level.sx >= level.width * level.tilewidth) {

                level.sx = 0;

            }

        }
        game.player.update(); // update the player

    },
    render: function () { // render the game state
        let level = levelsManager.getLevel(game.currentLevel);
        if (level) {
            level.render();
        }
        game.player.render();
    }
});

loop.start();    // start the game
