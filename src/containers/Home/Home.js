import React, { useState } from "react";
import classes from "./Home.module.css";
import ScoreBoard from "./ScoreBoard/ScoreBoard";
import { Redirect, NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

function Home(props) {
	const [logout, setLogout] = useState(false);

	const logoutClicked = () => {
		props.onLogout();
		setLogout(true);
	};

	const toggleLevelScore = (type) => {
		if(type === props.level)
			return;
		props.onSetLevel(type);
	}

	let logoutRedirect = null;
	if (logout) {
		logoutRedirect = <Redirect to="/" />;
	}

	return (
		<div className={classes.Body}>
			{logoutRedirect}
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
				<NavLink to="/game1">EASY</NavLink>
				<NavLink to="/game2">HARD</NavLink>
			</div>

			<div className={classes.ScoreBoard}>
				<h2>YOUR TOP 10 GAMES</h2>
				<button
					onClick={() => toggleLevelScore("color")}
					className={`${
						props.level === "color"
							? classes.ScoreBtnClicked
							: classes.ScoreBtn
					}`}
				>
					EASY
				</button>
				<button
					onClick={() => toggleLevelScore("card")}
					className={`${
						props.level === "card"
							? classes.ScoreBtnClicked
							: classes.ScoreBtn
					}`}
				>
					HARD
				</button>
				<ScoreBoard level={props.level} />
			</div>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		level: state.list.level,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onLogout: () => dispatch(actions.logout()),
		onSetLevel: (level) => dispatch(actions.setLevel(level)),
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
