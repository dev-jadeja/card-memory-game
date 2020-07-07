import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { Redirect } from "react-router-dom";
import axios from "../../axios-score";
import Spinner from "../Spinner/Spinner";

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {
	const [backToHome, setBackToHome] = useState(false);
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);

	const clickedBackToHome = () => {
		setLoading(true);
		const fullDate = new Date();

		const score = {
			moves: props.score,
			date: `${fullDate.getDate()}/${
				fullDate.getMonth() + 1
			}/${fullDate.getFullYear()}`,
		};

		axios
			.post("/scores.json", score)
			.then((res) => {
				setBackToHome(true);
				setLoading(false);
			})
			.catch((err) => {
				setLoading(false);
				setError(true);
				setTimeout(() => setBackToHome(true), 5000);
			});
	};

	let modal = (
		<React.Fragment>
			<DialogTitle id="alert-dialog-slide-title">
				{error ? null : "Congratulations!"}
			</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-slide-description">
					{error
						? "Some error occured to store the score. You will be redirected to the home page in 5 seconds"
						: `You completed the game in ${props.score} moves.`}
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				{error ? null : (
					<Button onClick={clickedBackToHome} color="primary">
						BACK TO HOME PAGE
					</Button>
				)}
			</DialogActions>
		</React.Fragment>
	);

	if (loading) {
		modal = <Spinner />;
	}

	return (
		<div>
			{backToHome ? <Redirect to="/home" /> : null}

			<Dialog
				open={true}
				TransitionComponent={Transition}
				keepMounted
				aria-labelledby="alert-dialog-slide-title"
				aria-describedby="alert-dialog-slide-description"
			>
				{modal}
			</Dialog>
		</div>
	);
}
