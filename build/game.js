var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Castlevania;
(function (Castlevania) {
    var Boot = (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            _super.apply(this, arguments);
        }
        Boot.prototype.preload = function () {
            this.load.image('preloadBar', 'assets/loader.png');
        };
        Boot.prototype.create = function () {
            this.input.maxPointers = 1;
            this.stage.disableVisibilityChange = true;
            if (this.game.device.desktop) {
                this.scale.pageAlignHorizontally = true;
            }
            else {
            }
            this.game.state.start('Preloader', true, false);
        };
        return Boot;
    })(Phaser.State);
    Castlevania.Boot = Boot;
})(Castlevania || (Castlevania = {}));
var Castlevania;
(function (Castlevania) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            _super.call(this, 800, 600, Phaser.AUTO, 'content', null);
            this.state.add('Boot', Castlevania.Boot, false);
            this.state.add('Preloader', Castlevania.Preloader, false);
            this.state.add('MainMenu', Castlevania.MainMenu, false);
            this.state.add('Level1', Castlevania.Level1, false);
            this.state.start('Boot');
        }
        return Game;
    })(Phaser.Game);
    Castlevania.Game = Game;
})(Castlevania || (Castlevania = {}));
var Castlevania;
(function (Castlevania) {
    var Level1 = (function (_super) {
        __extends(Level1, _super);
        function Level1() {
            _super.apply(this, arguments);
        }
        Level1.prototype.create = function () {
            this.physics.startSystem(Phaser.Physics.ARCADE);
            this.background = this.add.sprite(0, 0, 'level1');
            this.music = this.add.audio('music', 1, false);
            this.music.play();
            this.player = new Castlevania.Player(this.game, 130, 284);
        };
        return Level1;
    })(Phaser.State);
    Castlevania.Level1 = Level1;
})(Castlevania || (Castlevania = {}));
var Castlevania;
(function (Castlevania) {
    var MainMenu = (function (_super) {
        __extends(MainMenu, _super);
        function MainMenu() {
            _super.apply(this, arguments);
        }
        MainMenu.prototype.create = function () {
            this.background = this.add.sprite(0, 0, 'titlepage');
            this.background.alpha = 0;
            this.logo = this.add.sprite(this.world.centerX, -300, 'logo');
            this.logo.anchor.setTo(0.5, 0.5);
            this.add.tween(this.background).to({ alpha: 1 }, 2000, Phaser.Easing.Bounce.InOut, true);
            this.add.tween(this.logo).to({ y: 220 }, 2000, Phaser.Easing.Elastic.Out, true, 2000);
            this.input.onDown.addOnce(this.fadeOut, this);
        };
        MainMenu.prototype.fadeOut = function () {
            this.add.tween(this.background).to({ alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
            this.add.tween(this.logo)
                .to({ y: 800 }, 2000, Phaser.Easing.Linear.None, true)
                .onComplete.add(this.startGame, this);
        };
        MainMenu.prototype.startGame = function () {
            this.game.state.start('Level1', true, false);
        };
        return MainMenu;
    })(Phaser.State);
    Castlevania.MainMenu = MainMenu;
})(Castlevania || (Castlevania = {}));
var Castlevania;
(function (Castlevania) {
    var Player = (function (_super) {
        __extends(Player, _super);
        function Player(game, x, y) {
            _super.call(this, game, x, y, 'simon', 0);
            this.anchor.setTo(0.5, 0);
            this.animations.add('walk', [0, 1, 2, 3, 4], 10, true);
            game.add.existing(this);
            game.physics.enable(this);
        }
        Player.prototype.update = function () {
            this.body.velocity.x = 0;
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
                this.body.velocity.x = -170;
                this.animations.play('walk');
                if (this.scale.x == 1) {
                    this.scale.x = -1;
                }
            }
            else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
                this.body.velocity.x = 170;
                this.animations.play('walk');
                if (this.scale.x == -1) {
                    this.scale.x = 1;
                }
            }
            else {
                this.animations.frame = 0;
            }
        };
        return Player;
    })(Phaser.Sprite);
    Castlevania.Player = Player;
})(Castlevania || (Castlevania = {}));
var Castlevania;
(function (Castlevania) {
    var Preloader = (function (_super) {
        __extends(Preloader, _super);
        function Preloader() {
            _super.apply(this, arguments);
        }
        Preloader.prototype.preload = function () {
            this.preloadBar = this.add.sprite(200, 250, 'preloadBar');
            this.load.setPreloadSprite(this.preloadBar);
            this.load.image('titlepage', 'assets/titlepage.jpg');
            this.load.image('logo', 'assets/logo.png');
            this.load.audio('music', 'assets/title.mp3', true);
            this.load.spritesheet('simon', 'assets/simon.png', 58, 96, 5);
            this.load.image('level1', 'assets/level1.png');
        };
        Preloader.prototype.create = function () {
            this.add.tween(this.preloadBar)
                .to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true)
                .onComplete.add(this.startMainMenu, this);
        };
        Preloader.prototype.startMainMenu = function () {
            this.game.state.start('MainMenu', true, false);
        };
        return Preloader;
    })(Phaser.State);
    Castlevania.Preloader = Preloader;
})(Castlevania || (Castlevania = {}));
window.onload = function () {
    var game = new Castlevania.Game();
};
//# sourceMappingURL=game.js.map