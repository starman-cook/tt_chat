import {GET_USER_CHATS, SET_CURRENT_CHAT} from "./chatActionTypes";

const initialState = {
    chats: [],
    currentChat: null
}
const chatReducer = (state=initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_CHAT:
            return {...state, currentChat: action.value}
        case GET_USER_CHATS:
            return {...state, chats: action.value}
        default:
            return state
    }
}
export default chatReducer