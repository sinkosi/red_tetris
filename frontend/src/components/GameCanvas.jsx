import React, { useEffect, useState, useRef } from "react"
import { pieces, pieceStartPosition } from "../misc/pieces"
import { config } from "../misc/canvasConfig"
import CanvasGrid from "../misc/canvasGrid"
import Piece from "../misc/Piece"

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
	if (newPiece.isCollition(x, y, pieceVariant)) return null
	return newPiece
}

const GameCanvas = (props) => {
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
				let gr = new CanvasGrid(context)
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
					grid.removeFilledLines()
					let np = newPiece(context, grid)
					if (!np) props.setGameOver(true)
					setCurrentPiece(np)
					setSeconds(0)
					console.log("lock current piece and request for the next piece")
				}
		}, 1000)
		return () => clearInterval(interval)
	}, [currentPiece, context, grid, props])

	return (
		<div
			style={{
				textAlign: "center",
			}}>
			<h3>{seconds} seconds since mount</h3>
			<canvas
				id="canvas"
				ref={canvasRef}
				width={config.COLS * config.BLOCK}
				height={config.ROWS * config.BLOCK}
				style={{
					border: "2px solid #000",
					marginTop: 10,
				}}></canvas>
		</div>
	)
}

export default GameCanvas
