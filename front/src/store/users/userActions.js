import { push } from 'connected-react-router'
import axiosApi from '../../axiosApi'
import {
    GET_ALL_USERS,
    LOGIN_USER_FAILURE,
    LOGIN_USER_SUCCESS,
    LOGOUT_USER,
    REGISTER_USER_FAILURE,
    REGISTER_USER_SUCCESS
} from "./userActionTypes"


const registerUserSuccess = () => {
    return { type: REGISTER_USER_SUCCESS }
}
const registerUserFailure = error => {
    return { type: REGISTER_USER_FAILURE, error }
}
const loginUserSuccess = (user) => {
    return { type: LOGIN_USER_SUCCESS, user }
}
const loginUserFailure = error => {
    return { type: LOGIN_USER_FAILURE, error }
}
const getAllUsersSuccess = (value) => ({type: GET_ALL_USERS, value})

export const getAllUsers = () => {
    return async dispatch => {
        try {
            const response = await axiosApi.get('/users')
            dispatch(getAllUsersSuccess(response.data))
        } catch (e) {
            console.log(e)
        }
    }
}

export const registerUser = userData => {
    return async dispatch => {
        try {
            await axiosApi.post('/users', userData)
            dispatch(registerUserSuccess())
            dispatch(push('/login'))
        } catch (e) {
            if (e.response && e.response.data) {
                dispatch(registerUserFailure(e.response.data))
            } else {
                dispatch(registerUserFailure({ global: 'No internet' }))
            }
        }
    }
}

export const loginUser = userData => {
    return async dispatch => {
        try {
            const response = await axiosApi.post('/users/sessions', userData)
            dispatch(loginUserSuccess(response.data.user))
            dispatch(push('/'))
        } catch (e) {
            if (e.response && e.response.data) {
                dispatch(loginUserFailure(e.response.data))
            } else {
                dispatch(loginUserFailure({ global: 'No internet' }))
            }
        }
    }
}
export const logoutUser = () => {
    return async dispatch => {
        try {
            await axiosApi.delete('/users/sessions')
        } catch (error) {
            console.log(error);
        }
        dispatch({ type: LOGOUT_USER })
        dispatch(push('/'))
    }
}