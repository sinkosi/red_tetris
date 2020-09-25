import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

const App2 = () => {
	return (
		<div>
			<h1>Heading</h1>
			AAnother test!

		</div>
	)
}
/*
import React from "react"
import ReactDOM from "react-dom"
//import "./index.css"
import App from "./App"
import * as serviceWorker from "./serviceWorker"
*/
ReactDOM.render(
	<React.StrictMode>
		<App2 />
	</React.StrictMode>,
	document.getElementById("root")
)
/*
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
*/