import dungeon from "./dungeon.js";

export default class PlayerCharacter {
    constructor(x, y) {
	this.name = "The Player";
        this.movementPoints = 1;
	this.actionPoints = 1;
	this.healthPoints = 15;
        this.cursors = dungeon.scene.input.keyboard.createCursorKeys();
        this.x = x;
        this.y = y;
        this.tile = 29;
	this.hp = 10;
	this.moving = false;

        dungeon.initializeEntity(this);
    }

    createUI(config) {
	let scene = config.scene;
	let x = config.x;
	let y = config.y;
	let accumulatedHeight = 0;

	// player sprite
	this.UIsprite = scene.add.sprite(x, y, "tiles", this.tile).setOrigin(0);

	// player name
	this.UIheader = scene.add.text(
	    x + 20,
	    y,
	    this.name,
	    {
		font: "16px Arial",
		color: "#CFC6B8"
	    });

	// player stats
	this.UIstats = scene.add.text(
	    x + 20,
	    y + 20,
	    `HP: ${this.healthPoints}\nMP: ${this.movementPoints}\nAP: ${this.actionPoints}`,
	    {
		font: "12px Arial",
		fill: "#CFC6B8"
	    });
	accumulatedHeight += this.UIstats.height + this.UIsprite.height;

	// inventory screen
	let itemsPerRow = 5;
	let rows = 2;
	this.UIitems = [];
	for(let row=1; row <= rows; row++) {
	    for(let cell=1; cell <= itemsPerRow; cell++) {
		let rx = x + (25 * cell);
		let ry = y + 50 + (25 * row);
		this.UIitems.push(
		    scene.add.rectangle(rx, ry, 20, 20, 0xCFC6B8, 0.3).setOrigin(0)
		);
	    }
	}
	accumulatedHeight += 90;

	// separator
	scene.add.line(x+5, y+120, 0, 10, 175, 10, 0xCFC6B8).setOrigin(0);

	return accumulatedHeight;
    }

    turn() {
	let oldX = this.x;
	let oldY = this.y;
	let moved = false;
        let newX = this.x;
        let newY = this.y;

        if (this.movementPoints > 0 && !this.moving) {
            if (this.cursors.left.isDown) {
                newX -= 1;
                moved = true;
            }

            if (this.cursors.right.isDown) {
                newX += 1;
                moved = true;
            }

            if (this.cursors.up.isDown) {
                newY -= 1;
                moved = true;
            }

            if (this.cursors.down.isDown) {
                newY += 1;
                moved = true;
            }

            if (moved) {
                this.movementPoints -= 1;

		if (!dungeon.isWalkableTile(newX, newY)) {
		    let enemy = dungeon.entityAtTile(newX, newY);
		    if (enemy && (this.actionPoints > 0)) {
			dungeon.attackEntity(this, enemy);
			this.actionPoints -= 1;
		    }
		    newX = oldX;
		    newY = oldY;
		}

		if ((newX != oldX) || (newY != oldY)) {
		    dungeon.moveEntityTo(this, newX, newY);
		}
            }
        }

	if (this.healthPoints <= 5) {
	    this.sprite.tint = Phaser.Display.Color.GetColor(255, 0, 0);
	}
    }

    refresh() {
        this.movementPoints = 1;
	this.actionPoints = 1;
    }

    over() {
        let isOver =  this.movementPoints == 0 && !this.moving;

	if (isOver && this.UIheader) {
	    this.UIheader.setColor("#CFC6B8");
	} else {
	    this.UIheader.setColor("#FFFFFF");
	}

	if (this.UIstatsText) {
	    this.UIstatsText.setText(`HP: ${this.healthPoints}\nMP: ${this.movementPoints}\nAP: ${this.actionPoints}`);
	}
	
	return isOver;
    }

    attack() {
	return 1;
    }

    onDestroy() {
	alert("OMG! You died!");
	location.reload();
    }
}
