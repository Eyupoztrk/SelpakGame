export default class GameOverScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOverScene' });
    }

    init(data) {
        this.currentScore = data.currentScore || 0;
        this.highScore = data.highScore || 0;
        this.previousScene = data.sceneKey || 'GameSceneWithoutTime';
    }

    preload() {
        // Arka plan için bir görsel yükleyebilirsin ya da ses ekleyebilirsin
       // this.load.audio('gameOverSound', 'Assests/Sounds/gameover.mp3'); // Ses dosyasını yüklüyoruz
    }

    create() {
        // Oyun bittiğinde ses çal
       // this.sound.play('gameOverSound');

        // Arka planı gradient yapıyoruz
        

        // "Game Over" yazısı hafifçe büyüyerek gelir
        let gameOverText = this.add.text(window.innerWidth / 2, window.innerHeight / 4, 'Game Over', {
            fontSize: '64px',
            fill: '#ffffff',
            fontStyle: 'bold',
            stroke: '#000',
        }).setOrigin(0.5);
        this.tweens.add({
            targets: gameOverText,
            scaleX: 1.1,
            scaleY: 1.1,
            ease: 'Power1',
            duration: 1000,
            yoyo: true,
            repeat: -1
        });

        // Skorları hafif kaydırma efektiyle ekleyelim
        this.add.tween({
            targets: this.add.text(window.innerWidth / 2, window.innerHeight / 2 - 40, `Current Score: ${this.currentScore}`, {
                fontSize: '32px',
                fill: '#ffffff',
                stroke: '#000',

            }).setOrigin(0.5),
            y: window.innerHeight / 2 - 50,
            duration: 1000,
            ease: 'Bounce'
        });

        this.add.tween({
            targets: this.add.text(window.innerWidth / 2, window.innerHeight / 2, `High Score: ${this.highScore}`, {
                fontSize: '32px',
                fill: '#ffffff',
                stroke: '#000',

            }).setOrigin(0.5),
            y: window.innerHeight / 2 + 10,
            duration: 1000,
            ease: 'Bounce'
        });

        // Buton - Hover ve Click efektleri ile birlikte
        let restartButton = this.add.text(window.innerWidth / 2, window.innerHeight / 2 + 80, 'Restart Game', {
            fontSize: '36px',
            fill: '#ffffff',
            backgroundColor: '#00f',
            padding: { x: 20, y: 10 },
            fontStyle: 'bold',
            stroke: '#000',
            strokeThickness: 3
        }).setOrigin(0.5).setInteractive();

        restartButton.on('pointerover', () => {
            restartButton.setStyle({ fill: '#ff0', backgroundColor: '#f00' });
        });

        restartButton.on('pointerout', () => {
            restartButton.setStyle({ fill: '#ffffff', backgroundColor: '#00f' });
        });

        restartButton.on('pointerdown', () => {
            this.scene.start(this.previousScene); // Geldiği sahneyi yeniden başlat
        });

        // Ekstra bir "Exit Game" butonu ekleyebiliriz
        let exitButton = this.add.text(window.innerWidth / 2, window.innerHeight / 2 + 150, 'Exit Game', {
            fontSize: '36px',
            fill: '#ffffff',
            backgroundColor: '#f00',
            padding: { x: 20, y: 10 },
            fontStyle: 'bold',
            stroke: '#000',
            strokeThickness: 3
        }).setOrigin(0.5).setInteractive();

        exitButton.on('pointerover', () => {
            exitButton.setStyle({ fill: '#ff0', backgroundColor: '#00f' });
        });

        exitButton.on('pointerout', () => {
            exitButton.setStyle({ fill: '#ffffff', backgroundColor: '#f00' });
        });

        exitButton.on('pointerdown', () => {
            this.scene.start('StartScene'); // Ana menüye dönme
        });
    }
}
