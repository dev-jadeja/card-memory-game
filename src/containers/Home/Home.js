import React from "react";
import classes from "./Home.module.css";
import ScoreBoard from "./ScoreBoard/ScoreBoard";

function Home() {
	return (
		<div className={classes.Body}>
			<div className={classes.Greeting}>hello random person</div>
            <div style={{
                fontSize: "30px",
            }}>choose difficulty level</div>
			<div className={classes.Levels}>
				<button className={classes.EasyBtn}>EASY</button>
				<button className={classes.MediumBtn}>MEDIUM</button>
				<button className={classes.HardBtn}>HARD</button>
			</div>

			<div className={classes.ScoreBoard}>
				<h2>YOUR BEST GAMES</h2>
				<ScoreBoard />
			</div>
		</div>
	);
}

export default Home;
