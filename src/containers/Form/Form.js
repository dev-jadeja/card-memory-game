import React, { useState } from "react";
import classes from "./Form.module.css";
import { updateObject, checkValidity } from "../../shared/utility";
import Input from "../../UI/Input/Input";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import Spinner from "../../UI/Spinner/Spinner";
import { Redirect } from "react-router-dom";

function Form(props) {
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

	const submitHanlder = (event) => {
		event.preventDefault();
		const isLogin = props.formType === "LOGIN" ? true : false;
		props.onAuth(authForm.email.value, authForm.password.value, isLogin);
	};

	let errorMessage = null;

	if(props.error) {
		errorMessage = <p>{props.error.message}</p>
	}

	let authRedirect = null;
	if(props.isAuthenticated) {
		authRedirect = <Redirect to="/home" />
	}

	let completeForm = (
		<div className={classes.Box}>
			{authRedirect}
			{errorMessage}
			<form onSubmit={submitHanlder}>
				<h1 className={classes.Heading}>{props.formType}</h1>
				{form}
				<input type="submit" value="SUBMIT" className={classes.Btn} />
			</form>
			<button className={classes.ToggleBtn} onClick={props.clicked}>
				{props.children}
			</button>
		</div>
	);

	if (props.loading) completeForm = <Spinner />;

	return completeForm;
}

const mapStateToProps = (state) => {
	return {
		loading: state.auth.loading,
		error: state.auth.error,
		isAuthenticated: state.auth.token !== null,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onAuth: (email, password, isLogin) =>
			dispatch(actions.auth(email, password, isLogin)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
