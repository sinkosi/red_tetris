import { Button } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import controls from "../misc/controls"
import { newPiece } from "../misc/Piece"
import GameCanvas from "./GameCanvas"

const Game = (props) => {
	const [gameOver, setGameOver] = useState(true)
	const [grid, setGrid] = useState(null)
	const [currentPiece, setCurrentPiece] = useState(null)
	const [nextPiece, setNextPiece] = useState(null)
	const [context, setContext] = useState(null)

	useEffect(() => {
		// setCurrentPiece(newPiece())
		setNextPiece(newPiece())
	}, [])

	const getNextPiece = () => {
		console.log("getNextPiece was called")
		let next = nextPiece
		next.context = context
		next.grid = grid
		// console.log({ next })
		// grid.draw()
		next.draw()
		setCurrentPiece(next)
		if (next.isCollision()) {
			setGameOver(true)
			setGrid(null)
			setContext(null)
		}
		setNextPiece(newPiece())
		return next
	}

	useEffect(() => {
		const handleKeyPress = ({ key }) => controls(key, currentPiece, grid, context)
		if (currentPiece) {
			document.addEventListener("keydown", handleKeyPress)
		}
		return () => {
			document.removeEventListener("keydown", handleKeyPress)
		}
	}, [currentPiece, grid, context])

	const handleStart = () => setGameOver(false)

	return (
		<>
			{gameOver ? (
				<Button color="primary" onClick={handleStart}>
					start
				</Button>
			) : (
				<GameCanvas
					setGameOver={setGameOver}
					grid={grid}
					setGrid={setGrid}
					currentPiece={currentPiece}
					setCurrentPiece={setCurrentPiece}
					context={context}
					setContext={setContext}
					getNextPiece={getNextPiece}
					gameOver={gameOver}
				/>
			)}
		</>
	)
}

export default Game
