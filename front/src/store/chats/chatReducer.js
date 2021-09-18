import {GET_USER_CHATS} from "./chatActionTypes";

const initialState = {
    chats: []
}
const chatReducer = (state=initialState, action) => {
    switch (action.type) {
        case GET_USER_CHATS:
            return {...state, chats: action.value}
        default:
            return state
    }
}
export default chatReducer