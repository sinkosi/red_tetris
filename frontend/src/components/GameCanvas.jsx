import React, { useEffect, useState, useRef } from "react"
import { pieces, pieceStartPosition } from "../misc/pieces"

/**********************************\
 * canvas config data
\**********************************/
const ROWS = 20
const COLS = 10
const EMPTY_BG = "#765"
const BORDER = "adf"
const BLOCK = 30

/****
 * Canvas drawing functions
 */
const drawBlock = (context, x, y, colour = EMPTY_BG, strokeColour = BORDER) => {
	context.fillStyle = colour
	context.fillRect(x * BLOCK, y * BLOCK, BLOCK, BLOCK)
	context.strokeStyle = strokeColour
	context.strokeRect(x * BLOCK, y * BLOCK, BLOCK, BLOCK)
}

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
				if (this.piece[this.active][row][col]) drawBlock(this.context, this.x + col, this.y + row, EMPTY_BG)
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
					if (newX + col < 0 || newX + col >= COLS || newY + row >= ROWS) {
						console.log("collision")
						return true
					}
					if (this.grid.coords[newY + row][newX + col] !== EMPTY_BG) {
						return true
					}
				}
			}
		}

		return false
	}
}

/**
 * Grid class
 */

function Grid(context, colums = COLS, rows = ROWS, backgroundColour = EMPTY_BG) {
	this.colums = colums
	this.rows = rows
	this.colour = backgroundColour
	this.coords = []

	this.init = () => {
		for (let row = 0; row < this.rows; row++) {
			this.coords[row] = []
			for (let col = 0; col < this.colums; col++) {
				this.coords[row][col] = EMPTY_BG
			}
		}
		this.draw()
	}

	this.draw = () => {
		let r = 0
		let c = 0
		while (this.coords[r]) {
			c = 0
			while (this.coords[r][c]) {
				drawBlock(context, c, r, this.coords[r][c])
				c++
			}
			r++
		}
	}

	this.penalty = (currentPiece) => {
		let y = 0
		while (this.coords[y + 1]) {
			this.coords[y] = this.coords[y + 1]
			y++
		}
		this.coords[y] = []
		for (let c = 0; c < COLS; c++) {
			this.coords[y][c] = "red"
		}
		this.draw()

		if (currentPiece.y - 1 >= 0) currentPiece.y -= 1
		currentPiece.draw()
	}

	this.removeFull = () => {}
}

// function penalty(grid, piece) {
// 	let y = 0
// 	while (grid.coords[y + 1]) {
// 		grid.coords[y] = grid.coords[y + 1]
// 		y++
// 	}
// 	grid.coords[y] = []
// 	for (let c = 0; c < COLS; c++) {
// 		grid.coords[y][c] = "red"
// 	}
// 	grid.draw()
// 	piece.y -= 1
// 	piece.draw()
// }

function controls(key, piece, grid, context) {
	if (key === "ArrowUp") piece.rotate()
	if (key === "ArrowLeft") piece.moveLeft()
	if (key === "ArrowRight") piece.moveRight()
	if (key === "ArrowDown") piece.moveDown()
	if (key === "l") piece.lock()
	if (key === "p") grid.penalty(piece)
	if (key === "n") newPiece(context, grid)
}

function newPiece(context, grid) {
	if (!context || !grid) return null

	let pieceNum = Math.floor(Math.random() * pieces.length)
	let pieceVariant = Math.floor(Math.random() * pieces[pieceNum][0].length)
	console.log(pieceNum, pieceVariant)
	let newPiece = new Piece(context, grid, pieces[pieceNum][0], pieces[pieceNum][1])

	newPiece.active = pieceVariant
	let [y, x] = pieceStartPosition(pieceNum, pieceVariant)
	newPiece.x = x
	newPiece.y = y
	newPiece.draw()
	return newPiece
}

const GameCanvas = () => {
	const canvasRef = useRef(null)
	const [context, setContext] = useState(null)
	const [grid, setGrid] = useState(null)
	const [currentPiece, setCurrentPiece] = useState(null)

	useEffect(() => {
		if (canvasRef.current) {
			const renderCtx = canvasRef.current.getContext("2d")

			if (renderCtx) {
				setContext(renderCtx)
			}
		}
	}, [context])

	useEffect(() => {
		if (context) {
			if (!grid) {
				let gr = new Grid(context)
				gr.init()
				setGrid(gr)
			} else {
				console.log("grid already exist")

				if (!currentPiece) {
					let piece = newPiece(context, grid)
					piece.draw()
					setCurrentPiece(piece)
				} else {
					console.log("current piece already set: ", currentPiece)
				}

				/**
				 * this should be where the drawing magic happens
				 */
			}
		}
		return () => {
			console.log("this is where the cleanup stuff happens")
		}
	}, [context, grid, currentPiece])

	useEffect(() => {
		const handleKeyPress = ({ key }) => controls(key, currentPiece, grid, context)
		if (currentPiece) {
			document.addEventListener("keydown", handleKeyPress)
		}
		return () => {
			document.removeEventListener("keydown", handleKeyPress)
		}
	}, [currentPiece, grid, context])

	const [seconds, setSeconds] = useState(0)

	useEffect(() => {
		const interval = setInterval(() => {
			setSeconds((seconds) => seconds + 1)
			if (currentPiece)
				if (!currentPiece.moveDown()) {
					currentPiece.lock()
					setCurrentPiece(newPiece(context, grid))
					setSeconds(0)
					console.log("lock current piece and request for the next piece")
				}
		}, 1000)
		return () => clearInterval(interval)
	}, [currentPiece])

	return (
		<div
			style={{
				textAlign: "center",
			}}>
			<h3>{seconds} seconds since mount</h3>
			<canvas
				id="canvas"
				ref={canvasRef}
				width={COLS * BLOCK}
				height={ROWS * BLOCK}
				style={{
					border: "2px solid #000",
					marginTop: 10,
				}}></canvas>
		</div>
	)
}

export default GameCanvas
