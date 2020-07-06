import React, { useState } from "react";
import classes from "./Auth.module.css";
import { updateObject, checkValidity } from "../../shared/utility";
import Input from "../../components/UI/Input/Input";
import { Redirect } from "react-router-dom";

function Auth() {
	const [authForm, setAuthForm] = useState({
		email: {
			elementType: "input",
			elementConfig: {
				type: "email",
				placeholder: "Email",
			},
			value: "",
			validation: {
				required: true,
				isEmail: true,
			},
			valid: false,
			touched: false,
		},
		password: {
			elementType: "input",
			elementConfig: {
				type: "password",
				placeholder: "Password",
			},
			value: "",
			validation: {
				required: true,
				minLength: 6,
			},
			valid: false,
			touched: false,
		},
	});

	const inputChangedHandler = (event, controlName) => {
		const updatedControls = updateObject(authForm, {
			[controlName]: updateObject(authForm[controlName], {
				value: event.target.value,
				valid: checkValidity(
					event.target.value,
					authForm[controlName].validation
				),
				touched: true,
			}),
		});
		setAuthForm(updatedControls);
	};

	const formElementsArray = [];
	for (let key in authForm) {
		formElementsArray.push({
			id: key,
			config: authForm[key],
		});
	}

	let form = formElementsArray.map((formElement) => (
		<Input
			key={formElement.id}
			elementType={formElement.config.elementType}
			elementConfig={formElement.config.elementConfig}
			value={formElement.config.value}
			invalid={!formElement.config.valid}
			shouldValidate={formElement.config.validation}
			touched={formElement.config.touched}
			changed={(event) => inputChangedHandler(event, formElement.id)}
		/>
	));

	return (
		<div>
			<form className={classes.Box}>
				<h1 className={classes.Heading}>LOGIN</h1>
				{form}
				<input type="submit" value="SUBMIT" className={classes.Btn} />
			</form>
		</div>
	);
}

export default Auth;
