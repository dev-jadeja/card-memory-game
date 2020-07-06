import React from "react";
import classes from "./Card.module.css";

function Card(props) {
	return (
		<div className={classes.Container} onClick={props.clicked}>
			<div
				className={`${classes.Body} ${
					props.isFlipped || props.isSolved
						? classes.BodyIsFlipped
						: ""
				}`}
			>
				<div
					className={classes.Front}
					style={{
						backgroundColor: props.color,
					}}
				></div>
				<div className={classes.Back}>{props.color}</div>
			</div>
		</div>
	);
}

export default Card;
