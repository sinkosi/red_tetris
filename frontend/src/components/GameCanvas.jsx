import React, { useEffect, useRef } from "react"
import { config } from "../misc/canvasConfig"
import CanvasGrid from "../misc/canvasGrid"
import Piece, { newPiece } from "../misc/Piece"
//import Swipeable from 'react-swipeable'

function controls(key, piece, grid, context) {
	if (key === "ArrowUp") piece.rotate()
	if (key === "ArrowLeft") piece.moveLeft()
	if (key === "ArrowRight") piece.moveRight()
	if (key === "ArrowDown") piece.moveDown()
	if (key === "l") piece.lock()
	if (key === "p") grid.penalty(piece)
	if (key === "n") newPiece(context, grid)
	/*if (key === onSwipedUp) piece.rotate()
	if (key === onSwipedLeft) piece.moveLeft()
	PropTypes.func,
		onSwipedRight: PropTypes.func,
		onSwipedDown: PropTypes.func,
		onSwipedLeft: PropTypes.func,onSwip)*/
}

//function mobile_controls(onSwiped, piec)

// function newPiece(context, grid) {
// 	if (!context || !grid) return null

// 	let pieceNum = Math.floor(Math.random() * pieces.length)
// 	let pieceVariant = Math.floor(Math.random() * pieces[pieceNum][0].length)
// 	console.log(pieceNum, pieceVariant)
// 	let newPiece = new Piece(context, grid, pieces[pieceNum][0], pieces[pieceNum][1])

// 	newPiece.active = pieceVariant
// 	let [y, x] = pieceStartPosition(pieceNum, pieceVariant)
// 	newPiece.x = x
// 	newPiece.y = y
// 	newPiece.draw()
// 	if (newPiece.isCollition(x, y, pieceVariant)) return null
// 	return newPiece
// }

// const GameCanvas = (props) => {

const GameCanvas = ({
	grid,
	currentPiece,
	setCurrentPiece,
	setGrid,
	setGameOver,
	context,
	setContext,
	getNextPiece,
}) => {
	const canvasRef = useRef(null)

	useEffect(() => {
		if (canvasRef.current) {
			const renderCtx = canvasRef.current.getContext("2d")

			if (renderCtx) {
				setContext(renderCtx)
			}
		}
	}, [context, setContext])

	useEffect(() => {
		if (context) {
			if (!grid) {
				let gr = new CanvasGrid(context)
				gr.init()
				setGrid(gr)
			} else {
				// console.log("grid already exist")
				// grid.draw()
				if (!currentPiece) {
					console.log("request for a new piece")
					getNextPiece()
				}
			}
		}
		return () => {}
	}, [context, grid, currentPiece, setCurrentPiece, setGrid, getNextPiece])

	useEffect(() => {
		const interval = setInterval(() => {
			if (currentPiece)
				if (!currentPiece.moveDown()) {
					currentPiece.lock()
					grid.removeFilledLines()
					grid.draw()
					getNextPiece()
				}
		}, 1000)
		return () => clearInterval(interval)
	}, [currentPiece, context, grid, setGameOver, setCurrentPiece, setContext, getNextPiece])

	return (
		<div
			style={{
				textAlign: "center",
			}}>
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
