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

export const fetchScoreBoard = (token, userId, level) => {
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

				let updatedScoreList = fetchedScoreList.filter((score) => score.type === level);

				updatedScoreList.sort((prev, next) => {
					return prev.moves > next.moves ? 1 : -1;
				});

				if (updatedScoreList.length > 10)
					updatedScoreList.splice(10, updatedScoreList.length - 10);
				dispatch(fetchScoreBoardSuccess(updatedScoreList));
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

export const sendScore = (score, token, userId, type) => {
	return (dispatch) => {
		dispatch(sendScoreStart());
		const fullDate = new Date();

		const scoreData = {
			moves: score,
			date: `${fullDate.getDate()}/${
				fullDate.getMonth() + 1
			}/${fullDate.getFullYear()}`,
			userId: userId,
			type: type,
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

export const setBackToHome = () => {
	return {
		type: actionTypes.SET_BACK_TO_HOME,
	};
};

export const setLevel = (level) => {
	return {
		type: actionTypes.SET_LEVEL,
		level: level,
	};
}