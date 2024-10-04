
import GameSceneWithoutTime from './Scenes/GameSceneWithoutTime.js';
import GameSceneWithTime from './Scenes/GameSceneWithTime.js';
import StartScene from './Scenes/StartScene.js';
import GameOverScene from './Scenes/GameOverScene.js';


const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: '#1a97b1', 
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 250}, 
            debug: false 
        }
    },
    scene: [StartScene,GameSceneWithoutTime,GameSceneWithTime,GameOverScene]
};

const game = new Phaser.Game(config);
