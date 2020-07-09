import React, { useEffect } from "react";
import Board from "./containers/Board/Board";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import "./App.css";
import Home from "./containers/Home/Home";
import { connect } from "react-redux";
import * as actions from "./store/actions/index";

function App(props) {
	useEffect(() => {
		props.onTryAutoLogin();
	}, []);

	let routes = (
		<Switch>
			<Route path="/" exact component={LandingPage} />
			<Redirect to="/" />
		</Switch>
	);

	if (props.isAuthenticated) {
		routes = (
			<Switch>
				<Route path="/game1" component={Board} />
				<Route path="/game2" component={Board}/>
				<Route path="/home" component={Home} />
				<Redirect to="/home" />
			</Switch>
		);
	}

	return <div className="App">{routes}</div>;
}

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.auth.token !== null,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onTryAutoLogin: () => dispatch(actions.authCheckState()),
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
