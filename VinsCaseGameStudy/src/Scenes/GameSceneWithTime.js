import GameOverScene from './GameOverScene.js';
var fall_velocity;
var player;
var ground;
var cursors;
var keys;
var score = 0; 
var scoreText;
var timeForGame; 
var timerText;
var highScore;
var playSpeed;
var Types;
var Enemies;
var timeCounter;


export default class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameSceneWithTime' });
    }
    preload() {
        score =0;
        fall_velocity = 100;
        playSpeed = 350;
        timeForGame = 60;
        timeCounter = true;
        cursors = this.input.keyboard.createCursorKeys();

        keys = this.input.keyboard.addKeys({
            a: Phaser.Input.Keyboard.KeyCodes.A,
            d: Phaser.Input.Keyboard.KeyCodes.D,
            f: Phaser.Input.Keyboard.KeyCodes.F
        });
        this.load.image('bg', 'Assests/Images/1.jpg');
        this.load.image('type1', 'Assests/Images/type1.png');
        this.load.image('type2', 'Assests/Images/type2.png');
        this.load.image('type4', 'Assests/Images/type4.png');

        this.load.image('enemy1', 'Assests/Images/enemy1.png');
        this.load.image('enemy2', 'Assests/Images/enemy2.png');
        this.load.image('enemy3', 'Assests/Images/enemy3.png');

        this.load.spritesheet('player', 'Assests/Images/spritesheet.png', { frameWidth: 643, frameHeight: 542});
    }

    create() {

       //# Animations
       this.anims.create({
        key: 'turn',
        frames: this.anims.generateFrameNumbers('player', {start: 0, end: 9 }),
        frameRate: 20,
        repeat: -1
    });

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('player', { start: 10, end: 16 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('player', { start: 10, end: 16 }),
        frameRate: 10,
        repeat: -1
    });


        this.anims.create({
            key: 'die',
            frames: this.anims.generateFrameNumbers('player', { start: 32, end: 41 }),
            frameRate: 10,

        });
        //#Animations


        Types = this.physics.add.group();
        Enemies = this.physics.add.group();


        player = this.physics.add.sprite(window.innerWidth / 2, window.innerHeight, 'player');
        player.setScale(0.5);
        player.setCollideWorldBounds(true);
        player.setDepth(1);

        var bg = this.add.sprite(window.innerWidth / 2, window.innerHeight / 2, 'bg').setOrigin(0.5, 0.5);
        var scaleX = window.innerWidth / bg.width;
        var scaleY = window.innerHeight / bg.height;
        var scale = Math.max(scaleX, scaleY);
        bg.setScale(scale);
        bg.setDepth(-1);





        ground = this.add.rectangle(window.innerWidth, window.innerHeight - 15, window.innerWidth * 2, 25, 0xcaee6c);
        this.physics.add.existing(ground, true);




        this.time.addEvent({
            delay: 2000,
            callback: Spawn,
            callbackScope: this,
            loop: timeCounter
        });

        this.time.addEvent({
            delay: 1000,
            callback: TimerForGame,
            callbackScope: this,
            loop: true
        });

        highScore = localStorage.getItem('highScore') || 0; 

        scoreText = this.add.text(window.innerWidth - 16, 16, 'Score: 0', { fontSize: '50px', fontStyle: 'bold', fill: '#000' });
        scoreText.setOrigin(1, 0);
        scoreText.setDepth(10);

        timerText = this.add.text(16, 16, 'Time: 60', { fontSize: '50px', fontStyle: 'bold', fill: '#000' });
        timerText.setOrigin(0, 0);
        timerText.setDepth(10);



    }


    update() {
        player.setVelocityX(0);
        if (cursors.left.isDown || keys.a.isDown) {
            player.setVelocityX(-playSpeed);
            player.anims.play('left', true);
            player.flipX = true;
        }

        else if (cursors.right.isDown || keys.d.isDown) {
            player.setVelocityX(playSpeed);
            player.anims.play('right', true);
            player.flipX = false;
        }
        else if (keys.f.isDown) {
            player.anims.play('die', true);
        }
        else {
            player.anims.play('turn', true);
        }


    }

    OnGameOver() {
        this.checkHighScore();
        this.timeCounter = false;
        const currentScore = score;
        const currentSceneKey = this.scene.key;
        this.scene.start('GameOverScene', { currentScore: currentScore, highScore: highScore, sceneKey: currentSceneKey });
        console.log("Oyun Bitti");
    }

    checkHighScore() {
        if (score > highScore) {
            highScore = score;
            localStorage.setItem('highScore', highScore);
        }
    }


}

function TimerForGame()
{
    if(timeForGame > 0)
    {
        timeForGame--;
        timerText.setText('Time: ' + timeForGame);
    }
    else
    {
        this.OnGameOver();
    }
    
}

function Spawn() {
    const randomChoice = Math.random();
    if (randomChoice < 0.3) {
        spawnEnemies.call(this);
    } else {
        spawnTypes.call(this);
    }
}

function spawnTypes() {
    if (timeCounter) {
        var x = Phaser.Math.Between(0, window.innerWidth);
        var y = Phaser.Math.Between(0, 0);

        var randomValue = Phaser.Math.Between(0, 4);

        if (randomValue == 0) {
            var type = Types.create(x, y, 'type1');
        } else if (randomValue == 1) {
            var type = Types.create(x, y, 'type2');
        }
        else {
            var type = Types.create(x, y, 'type4');
        }


        type.setVelocityX(0, -100);
        type.setScale(0.4);
        type.setCollideWorldBounds(true);

        this.physics.add.collider(type, player, OnCollisionTypeToPlayer, null, this);
        this.physics.add.collider(type, ground, OnCollisionTypeToGround, null, this);
    }

}


function spawnEnemies() {
    if (timeCounter) {
        var x = Phaser.Math.Between(0, window.innerWidth);
        var y = Phaser.Math.Between(0, 0);

        var randomValue = Phaser.Math.Between(0, 4);

        if (randomValue == 0) {
            var enemy = Enemies.create(x, y, 'enemy1');
        } else if (randomValue == 1) {
            var enemy = Enemies.create(x, y, 'enemy2');
        }
        else {
            var enemy = Enemies.create(x, y, 'enemy3');
        }


        enemy.setVelocityX(0, -100);
        enemy.setScale(0.4);
        enemy.setCollideWorldBounds(true);

        this.physics.add.collider(enemy, player, OnCollisionEnemyToPlayer, null, this);
        this.physics.add.collider(enemy, ground, OnCollisionEnemyToGround, null, this);
    }

}


function OnCollisionTypeToPlayer(type) {
    console.log('Çarpışma gerçekleşti!');
    score += 10;
    scoreText.setText('Score: ' + score);
    type.destroy();
}

function OnCollisionTypeToGround(type) {

    console.log('yere değdi');
    type.destroy();
}

function OnCollisionEnemyToGround(enemy) {
    score += 5;
    scoreText.setText('Score: ' + score);
    enemy.destroy();
}

function OnCollisionEnemyToPlayer(enemy) {
    score -= 5;
    scoreText.setText('Score: ' + score);
    console.log('yere değdi');
    enemy.destroy();

}




