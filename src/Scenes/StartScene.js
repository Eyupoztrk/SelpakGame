export default class StartScene extends Phaser.Scene {
    constructor() {
        super({ key: 'StartScene' });
    }

    preload() {
        // Arka plan için görsel ve ses ekleyebilirsin.
        this.load.image('background', 'Assests/Images/player.png'); // Arka plan görseli
        //this.load.audio('startMusic', 'Assests/Sounds/startMusic.mp3'); // Başlangıç müziği
    }

    create() {
        // Başlangıç müziğini çal
      //  let music = this.sound.add('startMusic', { loop: true, volume: 0.5 });
       // music.play();

        // Arka planı ekle
        this.add.image(window.innerWidth / 2, window.innerHeight / 2, 'background').setOrigin(0.5).setScale(1.5);

        // Başlık metni animasyonlu olarak ekleniyor
        let titleText = this.add.text(window.innerWidth / 2, window.innerHeight / 4, 'Welcome to the Game!', {
            fontSize: '64px',
            fill: '#ffffff',
            fontStyle: 'bold',
            stroke: '#000',
            strokeThickness: 6
        }).setOrigin(0.5);

        this.tweens.add({
            targets: titleText,
            scaleX: 1.1,
            scaleY: 1.1,
            ease: 'Sine.easeInOut',
            duration: 1000,
            yoyo: true,
            repeat: -1
        });

        // "Endless Game" butonu
        let endlessButton = this.add.text(window.innerWidth / 2, window.innerHeight / 2 - 30, 'Endless Game', {
            fontSize: '36px',
            fill: '#ffffff',
            backgroundColor: '#00f',
            padding: { x: 20, y: 10 },
            fontStyle: 'bold',
            stroke: '#000',
            strokeThickness: 3
        }).setOrigin(0.5).setInteractive();

        endlessButton.on('pointerover', () => {
            endlessButton.setStyle({ fill: '#ff0', backgroundColor: '#0f0' });
        });

        endlessButton.on('pointerout', () => {
            endlessButton.setStyle({ fill: '#ffffff', backgroundColor: '#00f' });
        });

        endlessButton.on('pointerdown', () => {
           // music.stop(); // Müziği durdur
            this.scene.start('GameSceneWithoutTime'); // Endless mode sahnesine geçiş
        });

        // "Timed Game" butonu
        let timedButton = this.add.text(window.innerWidth / 2, window.innerHeight / 2 + 60, 'Timed Game', {
            fontSize: '36px',
            fill: '#ffffff',
            backgroundColor: '#f00',
            padding: { x: 20, y: 10 },
            fontStyle: 'bold',
            stroke: '#000',
            strokeThickness: 3
        }).setOrigin(0.5).setInteractive();

        timedButton.on('pointerover', () => {
            timedButton.setStyle({ fill: '#ff0', backgroundColor: '#00f' });
        });

        timedButton.on('pointerout', () => {
            timedButton.setStyle({ fill: '#ffffff', backgroundColor: '#f00' });
        });

        timedButton.on('pointerdown', () => {
          //  music.stop(); // Müziği durdur
            this.scene.start('GameSceneWithTime'); // Süreli oyun sahnesine geçiş
        });

        // Ses kapama butonu (isteğe bağlı)
        let muteButton = this.add.text(window.innerWidth - 50, 50, '🔇', {
            fontSize: '32px',
            fill: '#fff'
        }).setOrigin(0.5).setInteractive();

        muteButton.on('pointerdown', () => {
            if (this.sound.mute) {
                this.sound.setMute(false);
                muteButton.setText('🔇');
            } else {
                this.sound.setMute(true);
                muteButton.setText('🔈');
            }
        });
    }
}
