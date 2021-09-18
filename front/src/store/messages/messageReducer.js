import {GET_CHAT_MESSAGES, INIT_MESSAGES} from "./messageActionTypes";

const initialState = {
    messages: []
}
const messageReducer = (state=initialState, action) => {
    switch (action.type) {
        case INIT_MESSAGES:
            return {...state, messages: []}
        case GET_CHAT_MESSAGES:
            return {...state, messages: action.value}
        default:
            return state
    }
}
export default messageReducer