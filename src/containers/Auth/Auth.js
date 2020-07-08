import React, { useState} from "react";
import classes from "./Auth.module.css";
import Form from "../Form/Form";

function Auth() {
	const [loginActive, setLoginActive] = useState(true);
	const [isClicked, setIsClicked] = useState(false);

	const toggleFormHandler = () => {
		setIsClicked(true);
		setTimeout(() => {
			setLoginActive(!loginActive);
			setIsClicked(false);
		}, 200);
	};

	let form;

	if (loginActive) {
		form = (
			<div className={`${isClicked ? classes.Squeeze : classes.Enlarge}`}>
				<Form formType="LOGIN" clicked={toggleFormHandler}>
					Create a new account
				</Form>
			</div>
		);
	} else {
		form = (
			<div className={`${isClicked ? classes.Squeeze : classes.Enlarge}`}>
				<Form formType="REGISTER" clicked={toggleFormHandler}>
					Login with your account
				</Form>
			</div>
		);
	}

	return <div className={classes.Container}>{form}</div>;
}


export default Auth;
