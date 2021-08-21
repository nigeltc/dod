const scene = {
    preload: function() {
	this.load.bitmapFont("arcade", "font/arcade.png", "font/arcade.xml");
    },
    create: function() {
	this.player = this.add.bitmapText(400, 300, "arcade", "X")
	    .setOrigin(0.5);
	this.cursors = this.input.keyboard.createCursorKeys();
    },
    update: function() {
	if (this.cursors.left.isDown) {
	    this.player.x -= 10;
	}
	if (this.cursors.right.isDown) {
	    this.player.x += 10;
	}
	if (this.cursors.up.isDown) {
	    this.player.y -= 10;
	}
	if (this.cursors.down.isDown) {
	    this.player.y += 10;
	}
    }
};

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: "#000",
    parent: "game",
    pixelArt: true,
    scene: scene,
    physics: {
	default: "arcade",
	arcade: {
	    gravity: {y: 0}
	}
    }
};

const game = new Phaser.Game(config);
