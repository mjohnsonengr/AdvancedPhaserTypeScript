module Castlevania {

    export class MainMenu extends Phaser.State {

        private background: Phaser.Sprite;
        private logo: Phaser.Sprite;

        public create() {
            this.background = this.add.sprite(0, 0, 'titlepage');
            this.background.alpha = 0;

            this.logo = this.add.sprite(this.world.centerX, -300, 'logo');
            this.logo.anchor.setTo(0.5, 0.5);

            this.add.tween(this.background).to({ alpha: 1 }, 2000, Phaser.Easing.Bounce.InOut, true);
            this.add.tween(this.logo).to({ y: 220 }, 2000, Phaser.Easing.Elastic.Out, true, 2000);

            this.input.onDown.addOnce(this.fadeOut, this);

        }

        private fadeOut() {

            this.add.tween(this.background).to({ alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
            this.add.tween(this.logo)
                .to({ y: 800 }, 2000, Phaser.Easing.Linear.None, true)
                .onComplete.add(this.startGame, this);
        }

        private startGame() {

            this.game.state.start('Level1', true, false);

        }

    }

}
