import { Button } from "@material-ui/core"
import React, { useState } from "react"
import GameCanvas from "./GameCanvas"

const Game = (props) => {
	const [gameOver, setGameOver] = useState(true)

	const handleStart = () => setGameOver(false)

	return (
		<>
			{gameOver ? (
				<Button color="primary" onClick={handleStart}>
					start
				</Button>
			) : (
				<GameCanvas setGameOver={setGameOver} />
			)}
		</>
	)
}

export default Game
