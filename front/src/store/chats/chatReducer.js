import {GET_USER_CHATS, SET_CURRENT_CHAT_ID} from "./chatActionTypes";

const initialState = {
    chats: [],
    currentChatId: null
}
const chatReducer = (state=initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_CHAT_ID:
            return {...state, currentChatId: action.value}
        case GET_USER_CHATS:
            return {...state, chats: action.value}
        default:
            return state
    }
}
export default chatReducer