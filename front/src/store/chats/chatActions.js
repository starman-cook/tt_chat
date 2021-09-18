import axiosApi from '../../axiosApi'
import {GET_USER_CHATS} from "./chatActionTypes";


export const getUserChatsSuccess = (value) => ({type: GET_USER_CHATS, value})

export const getAllUserChats = (userId) => {
    return async dispatch => {
        try {
            const response = await axiosApi.get(`/chats/${userId}`)
            dispatch(getUserChatsSuccess(response.data))
        } catch (e) {
            console.log(e)
        }
    }
}