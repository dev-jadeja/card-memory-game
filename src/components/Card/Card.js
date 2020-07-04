import React from "react";
import classes from "./Card.module.css";

function Card(props) {
	return (
		<div className={classes.Container} onClick={props.clicked}>
			<div
				className={`${classes.Body} ${
					props.isFlipped || props.isSolved ? classes.BodyIsFlipped : ""
				}`}
			>
				<div className={classes.Front}>{props.content}</div>
				<div className={classes.Back}>{props.content}</div>
			</div>
		</div>
	);
}

export default Card;
