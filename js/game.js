// game.js
import { init, Text, TileEngine, initKeys, keyPressed, GameLoop, initGamepad, gamepadPressed } from './kontra.min.mjs';

import { Player } from './player.js';

import { levelsManager, LevelsManager } from './levelData.js';

import level1 from './level1.json' with {type: 'json'};
import level2 from './level2.json' with {type: 'json'};

let { canvas } = init();

const states = {
    menu: 0,
    playing: 1,
    gameOver: 2
};

const game = {
    currentLevel: 0,
    state: states.playing,
    text: Text({
        text: 'Game Over\nPress Space to Start Again',
        font: '32px Roboto',
        color: 'black',
        x: 350,
        y: 100,
        anchor: { x: 0.5, y: 0.5 },
        textAlign: 'center'
    }),
    player: new Player(65, 75)
};

let img = new Image();
img.src = 'assets/tilescat.png';
img.onload = function () {
    let tileEngine = TileEngine({
        // tile size
        tilewidth: 16,
        tileheight: 16,

        // map size in tiles
        width: 128,
        height: 30,

        // tileset object
        tilesets: [{
            firstgid: 1,
            image: img
        }],

        // layer object
        layers: [{
            name: 'background',
            data: level1.layers[0].data
        },
        {
            name: 'ground',
            data: level1.layers[1].data
        }
        ]
    });
    tileEngine.add(game.player.sprite);
    levelsManager.addLevel(tileEngine);
};

initKeys(); // initialize the keyboard input
initGamepad();
let loop = GameLoop({  // create the main game loop
    update: function (dt) { // update the game state

        const level = levelsManager.getLevel(game.currentLevel);

        if (!level) return
        if (keyPressed('space') || gamepadPressed('south')) {
            if (game.state === states.gameOver) {
                game.state = states.playing;
                game.player.setPosition(75, 100);
                game.player.isJumping = true;
                level.sx = 0;
            }
        }



        if (game.player.sprite.y > canvas.height) {
            game.state = states.gameOver;
            game.player.sprite.playAnimation('death');
            game.player.sprite.rotation = 0;
        } else {
            if (game.state === states.playing) {
                game.player.update(dt, game.currentLevel); // update the player
                if (game.player.getCurrentTile(game.currentLevel) == 3) {
                    game.state = states.gameOver;
                    game.player.sprite.playAnimation('death');
                    game.player.sprite.rotation = -Math.PI/4;
                    return;
                }

                if (game.player.getNextTile(game.currentLevel) == 3) {
                    game.state = states.gameOver;
                    game.player.sprite.playAnimation('death');
                    game.player.sprite.rotation = -Math.PI/4;
                    return;
                }
            }



        }

    },
    render: function () { // render the game state
        let level = levelsManager.getLevel(game.currentLevel);
        if (level) {
            level.render();
        }
        if (game.state === states.gameOver) {
            game.text.render();
        }

    }
});

loop.start();    // start the game
