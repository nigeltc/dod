import dungeon from "./dungeon.js";
import tm from "./turnManager.js";
import PlayerCharacter from "./player.js";
import BasicMonster from "./monster.js";

const world = {
    key: "world-scene",
    active: true,
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
	dungeon.initialize(this);

	// add the player
	dungeon.player = new PlayerCharacter(15, 15);
	tm.addEntity(dungeon.player);

	// add the monsters
	tm.addEntity(new BasicMonster(20, 20));
	tm.addEntity(new BasicMonster(20, 10));
	tm.addEntity(new BasicMonster(76, 10));
	tm.addEntity(new BasicMonster(29, 24));
	tm.addEntity(new BasicMonster(29, 20));

	// set camera
	// shrink game viewport to make space for ui
	let camera = this.cameras.main;
	camera.setViewport(0, 0, camera.worldView.width-200, camera.worldView.height);
	camera.setBounds(0, 0, camera.worldView.width, camera.worldView.height);
	camera.startFollow(dungeon.player.sprite);

	// trigger UI scence construction
	this.events.emit("createUI");
    },
    update: function() {
	if (tm.over()) {
	    tm.refresh();
	}
	tm.turn();
    }
};

export default world;

