import React from "react";
import Board from "./containers/Board/Board";
import { Route, Switch } from "react-router-dom";
import LandingPage from "./containers/LandingPage/LandingPage";
import "./App.css"

function App() {
	return (
		<div className="App">
			<Switch>
				<Route path="/game" component={Board} />
				<Route path="/" component={LandingPage} />
			</Switch>
		</div>
	);
}

export default App;
