import dungeon from "./dungeon.js";

export default class PlayerCharacter {
    constructor(x, y) {
        this.movementPoints = 1;
        this.cursors = dungeon.scene.input.keyboard.createCursorKeys();
        this.x = x;
        this.y = y;
        this.tile = 29;
	this.hp = 10;
	this.moving = false;

        dungeon.initializeEntity(this);
    }

    turn() {
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

		if (dungeon.isWalkableTile(newX, newY)) {
		    dungeon.moveEntityTo(this, newX, newY);
		}
            }
        }
    }

    refresh() {
        this.movementPoints = 1;
    }

    over() {
        return this.movementPoints == 0 && !this.moving;
    }
}
