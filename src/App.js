import React from "react";
import Board from "./containers/Board/Board";
import { Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import "./App.css"
import Home from "./containers/Home/Home";

function App() {
	return (
		<div className="App">
			<Switch>
				<Route path="/game" component={Board} />
				<Route path="/home" component={Home} />
				<Route path="/" component={LandingPage} />
			</Switch>
		</div>
	);
}

export default App;
