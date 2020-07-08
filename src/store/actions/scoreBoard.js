import * as actionTypes from "./actionTypes";
import axios from "../../axios-score";

export const fetchScoreBoardStart = () => {
	return {
		type: actionTypes.FETCH_SCORE_BOARD_START,
	};
};

export const fetchScoreBoardSuccess = (scoreBoard) => {
	return {
		type: actionTypes.FETCH_SCORE_BOARD_SUCCESS,
		scoreList: scoreBoard,
	};
};

export const fetchScoreBoardFail = (error) => {
	return {
		type: actionTypes.FETCH_SCORE_BOARD_FAIL,
		error: error,
	};
};

export const fetchScoreBoard = (token, userId) => {
	return (dispatch) => {
		dispatch(fetchScoreBoardStart());
		const queryParams =
			"?auth=" + token + '&orderBy="userId"&equalTo="' + userId + '"';
		axios
			.get("/scores.json" + queryParams)
			.then((res) => {
				let fetchedScoreList = [];
				for (let key in res.data) {
					fetchedScoreList.push({
						key: key,
						...res.data[key],
					});
				}

				fetchedScoreList.sort((prev, next) => {
					return prev.moves > next.moves ? 1 : -1;
				});

				if (fetchedScoreList.length > 10)
					fetchedScoreList.splice(10, fetchedScoreList.length - 10);
				dispatch(fetchScoreBoardSuccess(fetchedScoreList));
			})
			.catch((err) => {
				dispatch(fetchScoreBoardFail(err));
			});
	};
};

export const sendScoreStart = () => {
	return {
		type: actionTypes.SEND_SCORE_START,
	};
};

export const sendScoreSuccess = () => {
	return {
		type: actionTypes.SEND_SCORE_SUCCESS,
	};
};

export const sendScoreFail = () => {
	return {
		type: actionTypes.SEND_SCORE_FAIL,
	};
};

export const sendScoreFailHome = () => {
	return {
		type: actionTypes.SEND_SCORE_FAIL_HOME,
	};
};

export const sendScore = (score, token, userId) => {
	return (dispatch) => {
		dispatch(sendScoreStart());
		const fullDate = new Date();

		const scoreData = {
			moves: score,
			date: `${fullDate.getDate()}/${
				fullDate.getMonth() + 1
			}/${fullDate.getFullYear()}`,
			userId: userId,
		};

		axios
			.post("/scores.json?auth=" + token, scoreData)
			.then((res) => {
				dispatch(sendScoreSuccess());
			})
			.catch((err) => {
				dispatch(sendScoreFail());
				setTimeout(() => dispatch(sendScoreFailHome()), 5000);
			});
	};
};
