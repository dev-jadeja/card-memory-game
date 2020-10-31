import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { Redirect } from "react-router-dom";
import Spinner from "../../UI/Spinner/Spinner";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});
//sample comment that you dont need to see 
function AlertDialogSlide(props) {

	const clickedBackToHome = () => {
		props.clickedToHome(props.score, props.token, props.userId, props.type);
	};

	let modal = (
		<React.Fragment>
			<DialogTitle id="alert-dialog-slide-title">
				{props.error ? null : "Congratulations!"}
			</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-slide-description">
					{props.error
						? "Some error occured to store the score. You will be redirected to the home page in 5 seconds"
						: `You completed the game in ${props.score} moves.`}
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				{props.error ? null : (
					<Button onClick={clickedBackToHome} color="primary">
						BACK TO HOME PAGE
					</Button>
				)}
			</DialogActions>
		</React.Fragment>
	);

	if (props.loading) {
		modal = <Spinner />;
	}

	let homeRedirect = null;
	if(props.backToHome) 
		homeRedirect = <Redirect to="/home" />

	return (
		<div>
			{homeRedirect}
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

const mapStateToProps = (state) => {
	return {
		error: state.list.error,
		backToHome: state.list.backToHome,
		loading: state.list.loading,
		token: state.auth.token,
		userId: state.auth.userId,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		clickedToHome: (score, token, userId, type) =>
			dispatch(actions.sendScore(score, token, userId, type)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AlertDialogSlide);
