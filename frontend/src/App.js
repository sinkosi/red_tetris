import React from "react"
import CssBaseline from "@material-ui/core/CssBaseline"

import Header from "./components/Header"
import Game from "./components/Game"

import "./App.css"
// import Footer from "./components/Footer"

function App(props) {
	return (
		<>
			<CssBaseline>
				<Header />
				<Game />
				{/* <Footer /> */}
			</CssBaseline>
		</>
	)
}

export default App
