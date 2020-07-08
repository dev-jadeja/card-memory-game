import React, { useState } from "react";
import classes from "./Home.module.css";
import ScoreBoard from "./ScoreBoard/ScoreBoard";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

function Home(props) {
	const [clicked, setClicked] = useState(false);
	const [logout, setLogout] = useState(false);

	const btnClicked = () => {
		setClicked(true);
	};

	const logoutClicked = () => {
		props.onLogout();
		setLogout(true);
	};

	let logoutRedirect = null;
	if (logout) {
		logoutRedirect = <Redirect to="/" />;
	}

	let gameRedirect = null;
	if (clicked) {
		gameRedirect = <Redirect to="/game" />;
	}

	return (
		<div className={classes.Body}>
			{logoutRedirect}
			{gameRedirect}
			<button className={classes.Logout} onClick={logoutClicked}>
				LOGOUT
			</button>
			<div
				style={{
					fontSize: "30px",
				}}
			>
				choose difficulty level
			</div>
			<div className={classes.Levels}>
				<button className={classes.EasyBtn} onClick={btnClicked}>
					EASY
				</button>
				<button className={classes.MediumBtn} onClick={btnClicked}>
					MEDIUM
				</button>
				<button className={classes.HardBtn} onClick={btnClicked}>
					HARD
				</button>
			</div>

			<div className={classes.ScoreBoard}>
				<h2>YOUR BEST GAMES</h2>
				<ScoreBoard />
			</div>
		</div>
	);
}

const mapDispatchToProps = (dispatch) => {
	return {
		onLogout: () => dispatch(actions.logout()),
	};
};

export default connect(null, mapDispatchToProps)(Home);
