import axiosApi from '../../axiosApi'
import {GET_USER_CHATS, SET_CURRENT_CHAT} from "./chatActionTypes";
import {getAllChatMessages} from "../messages/messageActions";


export const getUserChatsSuccess = (value) => ({type: GET_USER_CHATS, value})

export const setCurrentChat = (value) => ({type: SET_CURRENT_CHAT, value})

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

export const createChat = (data) => {
    return async dispatch => {
        try {
            const response = await axiosApi.post('/chats', data)
            dispatch(setCurrentChat(response.data))
            dispatch(getAllChatMessages(response.data._id))
        } catch (e) {
            console.log(e)
        }
    }
}