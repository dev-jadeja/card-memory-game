import React from "react";
import classes from "./Input.module.css";

function Input(props) {
	let inputClasses = [classes.Inputs];

	if (props.invalid && props.shouldValidate && props.touched) {
		inputClasses.push(classes.Invalid);
	}

	return (
		<input
			className={inputClasses.join(" ")}
			{...props.elementConfig}
            value={props.value}
            onChange={props.changed}
		/>
	);
}

export default Input;
