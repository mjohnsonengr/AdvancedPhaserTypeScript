module Castlevania {

    export class Preloader extends Phaser.State {

        private preloadBar: Phaser.Sprite;

        public preload() {

            // Set-up our preloader sprite
            this.preloadBar = this.add.sprite(200, 250, 'preloadBar');
            this.load.setPreloadSprite(this.preloadBar);

            // Load our actual games assets
            // TODO I wonder if there's a way to avoid these hard-coded strings too.  At least the keys, but ideally the file paths too
            this.load.image('titlepage', 'assets/titlepage.jpg');
            this.load.image('logo', 'assets/logo.png');
            this.load.audio('music', 'assets/title.mp3', true);
            this.load.spritesheet('simon', 'assets/simon.png', 58, 96, 5);
            this.load.image('level1', 'assets/level1.png');

        }

        public create() {

            // This fades the preload bar over the duration of 1 second
            // TODO I wonder if I could load the main menu after a few specific sprites have finished loading 
            // TODO (update the progress bar a little bit per image)
            this.add.tween(this.preloadBar)
                .to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true)
                .onComplete.add(this.startMainMenu, this);

        }

        private startMainMenu() {

            this.game.state.start('MainMenu', true, false);

        }

    }

}
