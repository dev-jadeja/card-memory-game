import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
    scoreList: [],
    loading: false,
    backToHome: false,
    error: false,
    level: 'color',
};

const fetchScoreBoardSuccess = (state, action) => {
    return updateObject(state, {
        scoreList: action.scoreList,
        loading: false,
    })
}

const fetchScoreBoardStart = (state, action) => {
    return updateObject(state, {
        loading: true,
    })
}

const fetchScoreBoardFail = (state, action) => {
    return updateObject(state, {
        loading: false,
    })
}

const sendScoreStart = (state, action) => {
    return updateObject(state, {
        loading: true,
        backToHome: false,
    })
}

const sendScoreSuccess = (state, action) => {
    return updateObject(state, {
        backToHome: true,
        loading: false,
    })
}
 
const sendScoreFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: true,
        backToHome: true,
    })
}

const sendScoreFailHome = (state, action) => {
    return updateObject(state, {
        backToHome: true,
    })
}

const setBackToHome = (state, action) => {
    return updateObject(state, {
        backToHome: false,
    })
}

const setLevel = (state, action) => {
    return updateObject(state, {
        level: action.level,
    })
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.FETCH_SCORE_BOARD_START:
            return fetchScoreBoardStart(state, action);
        case actionTypes.FETCH_SCORE_BOARD_SUCCESS:
            return fetchScoreBoardSuccess(state, action);
        case actionTypes.FETCH_SCORE_BOARD_FAIL:
            return fetchScoreBoardFail(state, action);
        case actionTypes.SEND_SCORE_START:
            return sendScoreStart(state, action);
        case actionTypes.SEND_SCORE_SUCCESS:
            return sendScoreSuccess(state, action);
        case actionTypes.SEND_SCORE_FAIL:
            return sendScoreFail(state, action);
        case actionTypes.SEND_SCORE_FAIL_HOME:
            return sendScoreFailHome(state, action);
        case actionTypes.SET_BACK_TO_HOME:
            return setBackToHome(state, action);
        case actionTypes.SET_LEVEL:
            return setLevel(state, action);
        default: 
            return state;
    }
}

export default reducer;