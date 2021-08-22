const scene = {
    preload: function() {
	this.load.spritesheet(
	    "tiles",
	    "assets/colored.png",
	    {
		frameWidth: 16,
		framHeight: 16,
		spacing: 1
	    });
    },
    create: function() {
	let level = [
	    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	    [1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
	    [1, 0, 0, 0, 2, 0, 0, 0, 0, 1],
	    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	    [1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
	    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]];
	const wall = 554;
	const skeleton = 480;
	const floor = 0;
	level = level.map(r => r.map(t => t == 1 ? wall : t == 2 ? skeleton : floor));

	const tileSize = 16;
	const config = {
	    data: level,
	    tileWidth: tileSize,
	    tileHeight: tileSize
	};
	const map = this.make.tilemap(config);
	const tileset = map.addTilesetImage(
	    "tiles",
	    "tiles",
	    tileSize,
	    tileSize,
	    0, 1);
	const ground = map.createStaticLayer(0, tileset, 0, 0);
    },
    update: function() {
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
