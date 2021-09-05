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
        return this.movementPoints == 0 && !this.moving;
    }

    attack() {
	return 1;
    }

    onDestroy() {
	alert("OMG! You died!");
	location.reload();
    }
}
