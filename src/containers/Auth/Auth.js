import React, { useState } from "react";
import classes from "./Auth.module.css";
import Form from "../Form/Form";

function Auth() {
	const [loginActive, setLoginActive] = useState(true);

	const toggleFormHandler = () => {
		setLoginActive(!loginActive);
	};

	let loginClass = null;
	let registerClass = null;

	if(loginActive) {
		registerClass = classes.Out;
		loginClass = classes.Normal;
	}

	else {
		loginClass = classes.Up;
		registerClass = classes.In;
	}

	return (
		<div className={classes.Container}>
			<div className={loginClass}>
				<Form formType="LOGIN" clicked={toggleFormHandler}>
					Create a new account
				</Form>
			</div>
			<div className={registerClass}>
				<Form formType="REGISTER" clicked={toggleFormHandler}>
					Login with your account
				</Form>
			</div>
		</div>
	);
}

export default Auth;
