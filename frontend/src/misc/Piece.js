import { config } from "./canvasConfig"
import drawBlock from "./drawBlock"
/***
 * Tetramino Class
 */

function Piece(context, grid, piece, colour) {
	this.piece = piece
	this.colour = colour
	this.active = 0
	this.x = 0
	this.y = 0
	this.context = context
	this.grid = grid

	this.draw = (active = this.active) => {
		this.active = active

		for (let row = 0; row < this.piece[this.active].length; row++) {
			for (let col = 0; col < this.piece[this.active][row].length; col++) {
				if (this.piece[this.active][row][col]) drawBlock(this.context, this.x + col, this.y + row, this.colour)
			}
		}
	}
	this.clear = (active = this.active) => {
		this.active = active

		for (let row = 0; row < this.piece[this.active].length; row++) {
			for (let col = 0; col < this.piece[this.active][row].length; col++) {
				if (this.piece[this.active][row][col])
					drawBlock(this.context, this.x + col, this.y + row, config.EMPTY_BG)
			}
		}
	}
	this.lock = () => {
		for (let row = 0; row < this.piece[this.active].length; row++) {
			for (let col = 0; col < this.piece[this.active][row].length; col++) {
				if (this.piece[this.active][row][col]) grid.coords[this.y + row][this.x + col] = this.colour
			}
		}
	}

	this.rotate = () => {
		if (!this.isCollition(this.x, this.y, (this.active + 1) % 4)) {
			this.clear()
			this.active = (1 + this.active) % this.piece.length
			this.draw()
		} else if (!this.isCollition(this.x + 1, this.y, (this.active + 1) % 4)) {
			this.clear()
			this.x = this.x + 1
			this.active = (1 + this.active) % this.piece.length
			this.draw()
		} else if (!this.isCollition(this.x - 1, this.y, (this.active + 1) % 4)) {
			this.clear()
			this.x = this.x - 1

			this.active = (1 + this.active) % this.piece.length
			this.draw()
		} else if (!this.isCollition(this.x - 2, this.y, (this.active + 1) % 4)) {
			this.clear()
			this.x = this.x - 2

			this.active = (1 + this.active) % this.piece.length
			this.draw()
		}
	}

	this.moveLeft = () => {
		if (!this.isCollition(this.x - 1)) {
			this.clear()
			this.x = this.x - 1
			this.draw()
		}
	}

	this.moveRight = () => {
		if (!this.isCollition(this.x + 1)) {
			this.clear()
			this.x = this.x + 1
			this.draw()
		}
	}

	this.moveDown = () => {
		if (!this.isCollition(this.x, this.y + 1)) {
			this.clear()
			this.y = this.y + 1
			this.draw()
			return true
		}
		return false
	}

	this.isCollition = (newX = this.x, newY = this.y, newState = this.active) => {
		for (let row = 0; row < this.piece[newState].length; row++) {
			for (let col = 0; col < this.piece[newState][row].length; col++) {
				if (this.piece[newState][row][col]) {
					if (newX + col < 0 || newX + col >= config.COLS || newY + row >= config.ROWS) {
						console.log("collision")
						return true
					}
					if (this.grid.coords[newY + row][newX + col] !== config.EMPTY_BG) {
						return true
					}
				}
			}
		}

		return false
	}
}

export default Piece
