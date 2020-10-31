import React from "react";
import classes from "./Card.module.css";

function Card(props) {

	let style;

	if(props.type === 'color') {
		style = {
			backgroundColor: props.color,
		}
	}
	else {
		style = {
			backgroundImage: `url("${props.link}")`,
			backgroundPosition: "center",
			backgroundSize: "cover",
		}
	}

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
					style={style}
				></div>
				<div className={classes.Back}></div>
			</div>
		</div>
	);
}
//sample comment that you dont need to see 
export default Card;
