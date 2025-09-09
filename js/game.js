// game.js
import { init, Text, TileEngine, initKeys, keyPressed, GameLoop, initGamepad, gamepadPressed } from './kontra.min.mjs';

import { Player } from './player.js';

import { levelsManager, TilesCategory, LevelsManager } from './levelData.js';

import level1 from './level1.json' with {type: 'json'};
import level2 from './level2.json' with {type: 'json'};
import level3 from './level3.json' with {type: 'json'};

import { zzfx } from './zzfx.js';

let { canvas } = init();

const states = {
    menu: 0,
    playing: 1,
    gameOver: 2,
    win: 3,
    final: 4
};

const game = {
    currentLevel: 0,
    state: states.menu,
    text: Text({
        text: 'Game Over\nPress Space to Start Again',
        font: '32px fantasy',
        color: 'black',
        x: 325,
        y: 100,
        anchor: { x: 0.5, y: 0.5 },
        textAlign: 'center'
    }),
    initText: Text({
        text: 'Boing Kat\nPress Space to Start',
        font: '32px fantasy',
        color: 'black',
        x: 325,
        y: 100,
        anchor: { x: 0.5, y: 0.5 },
        textAlign: 'center'
    }),
    scoreText: Text({
        text: 'Score: 0',
        font: '32px fantasy',
        color: 'black',
        x: canvas.width - 80,
        y: 20,
        anchor: { x: 0.5, y: 0.5 },
        textAlign: 'center'
    }),
    levelText: Text({
        text: 'Level: 1',
        font: '14px fantasy',
        color: 'black',
        x: 325,
        y: 20,
        anchor: { x: 0.5, y: 0.5 },
        textAlign: 'center'
    }),
    finalScoreText: Text({
        text: '',
        font: '32px fantasy',
        color: 'black',
        x: 325,
        y: 200,
        anchor: { x: 0.5, y: 0.5 },
        textAlign: 'center'
    }),
    player: new Player(65, 75),
    death: function () {
        game.state = states.gameOver;
        game.player.sprite.playAnimation('death');
        zzfx(...[, , 20, .02, .02, .01, 2, .8, , -19, -29, .06, , , 73, , , .88, .02, .05]);
        game.player.sprite.rotation = -Math.PI / 4;
    },

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
    let tileEngine2 = TileEngine({
        // tile size
        tilewidth: 16,
        tileheight: 16,

        // map size in tiles
        width: 64,
        height: 30,

        // tileset object
        tilesets: [{
            firstgid: 1,
            image: img
        }],

        // layer object
        layers: [{
            name: 'background',
            data: level2.layers[0].data
        },
        {
            name: 'ground',
            data: level2.layers[1].data
        }
        ]
    });
    let tileEngine3 = TileEngine({
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
            data: level3.layers[0].data
        },
        {
            name: 'ground',
            data: level3.layers[1].data
        }
        ]
    });
    tileEngine.add(game.player.sprite);
    tileEngine2.add(game.player.sprite);
    tileEngine3.add(game.player.sprite);
    levelsManager.addLevel(tileEngine2);
    levelsManager.addLevel(tileEngine);
    levelsManager.addLevel(tileEngine3);
};

initKeys(); // initialize the keyboard input
initGamepad();
let loop = GameLoop({  // create the main game loop
    update: function (dt) { // update the game state

        let level = levelsManager.getLevel(game.currentLevel);

        if (!level) return
        if (keyPressed('space') || gamepadPressed('south')) {
            if (game.state === states.gameOver) {
                game.state = states.playing;
                game.player.resetPlayer();
                level.sx = 0;
            }
            if (game.state === states.menu) {
                game.state = states.playing;
                game.player.resetPlayer();
                level.sx = 0;
            }
            if (game.state === states.win) {
                game.currentLevel++;
                game.levelText.text = `Level: ${game.currentLevel + 1}`;
                level = levelsManager.getLevel(game.currentLevel);
                game.state = states.playing;
                game.player.resetPlayer();
                game.text.text = 'Game Over\nPress Space to Start Again';
                level.sx = 0;
            }
            if (game.state === states.final) {
                game.currentLevel = 0;
                game.levelText.text = `Level: ${game.currentLevel + 1}`;
                level = levelsManager.getLevel(game.currentLevel);
                game.state = states.playing;
                game.player.resetPlayer();
                game.text.text = 'Game Over\nPress Space to Start Again';
                level.sx = 0;
            }
        }

        if (game.player.sprite.x > (level.width * level.tilewidth - 50)
            && game.state == states.playing) {
            game.state = states.win;
            game.player.addScore(Math.floor(level.sx / 10));
            if (game.currentLevel >= levelsManager.levels.length - 1) {
                game.state = states.final;
                game.text.text = 'Congratulations!\nYou Finished the Game!\nPress Space to Start Again';
                game.player.score = 0;
                game.currentLevel = 0;
            } else {
                game.text.text = 'You Win!\nPress Space to Next Level';
            }

            return;
        }

        if (game.state === states.playing) {
            if (game.player.sprite.y > canvas.height) {
                game.death();
            } else {
                game.player.update(dt, game.currentLevel); // update the player
                if (game.player.getCurrentTile(game.currentLevel) == TilesCategory.SPIKES || game.player.getCurrentTile(game.currentLevel) == TilesCategory.SPIKES2) {
                    game.death();
                    return;
                }

                if (game.player.getNextTile(game.currentLevel) == TilesCategory.SPIKES || game.player.getNextTile(game.currentLevel) == TilesCategory.SPIKES2) {
                    game.death();
                    return;
                }
            }
        }

    },

    render: function () { // render the game state
        let level = levelsManager.getLevel(game.currentLevel);
        if (level) {
            level.render();

            if (game.state === states.menu) {
                game.initText.render();
            }
            if (game.state === states.gameOver || game.state === states.win || game.state === states.final) {
                game.text.render();
                game.finalScoreText.text = `Final Score: ${game.player.score + Math.floor(level.sx / 10)}`;
                game.finalScoreText.render();
                game.player.isJumping = true;
                return;
            }
            game.scoreText.text = `Score: ${game.player.score + Math.floor(level.sx / 10)}`;
            if (game.state === states.playing) {
                game.scoreText.render();

            }
            game.levelText.render();
        }

    }
});

loop.start();    // start the game
