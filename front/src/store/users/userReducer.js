import {
    GET_ALL_USERS,
    LOGIN_USER_FAILURE,
    LOGIN_USER_SUCCESS,
    LOGOUT_USER,
    REGISTER_USER_FAILURE,
    REGISTER_USER_SUCCESS
} from "./userActionTypes";

const initialState = {
    users: [],
    registerError: null,
    loginError: null,
    user: null
}
const userReducer = (state=initialState, action) => {
    switch (action.type) {
        case GET_ALL_USERS:
            return {...state, users: action.value}
        case REGISTER_USER_SUCCESS:
            return {...state, registerError: null}
        case REGISTER_USER_FAILURE:
            return {...state, registerError: action.error}
        case LOGIN_USER_SUCCESS:
            return {...state, user: action.user, loginError: null}
        case LOGIN_USER_FAILURE:
            return {...state, loginError: action.error}
        case LOGOUT_USER:
            return {...state, user: null}
        default:
            return state
    }
}
export default userReducer