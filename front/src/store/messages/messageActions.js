import {GET_CHAT_MESSAGES, INIT_MESSAGES} from "./messageActionTypes";
import axiosApi from "../../axiosApi";


export const getChatMessagesSuccess = (value) => ({type: GET_CHAT_MESSAGES, value})

export const initMessages = () => ({type: INIT_MESSAGES})

export const getAllChatMessages = (chatId) => {
    return async dispatch => {
        try {
            const response = await axiosApi.get(`/messages/${chatId}`)
            dispatch(getChatMessagesSuccess(response.data))
        } catch (e) {
            console.log(e)
        }
    }
}

export const sendChatMessage = (data) => {
    return async dispatch => {
        try {
            await axiosApi.post('/messages', data)
        } catch (e) {
            console.log(e)
        }
    }
}