module Castlevania {

    export class Level1 extends Phaser.State {

        private background: Phaser.Sprite;
        private music: Phaser.Sound;
        private player: Player;

        public create() {

            this.physics.startSystem(Phaser.Physics.ARCADE);

            this.background = this.add.sprite(0, 0, 'level1');

            this.music = this.add.audio('music', 1, false);
            this.music.play();

            this.player = new Player(this.game, 130, 284);

        }

    }

}
