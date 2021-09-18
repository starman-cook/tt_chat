import { applyMiddleware, combineReducers, compose, createStore } from "redux"
import thunkMiddleware from "redux-thunk"
import { connectRouter, routerMiddleware } from "connected-react-router"
import { createBrowserHistory } from "history"
import userReducer from "./users/userReducer"
import chatReducer from "./chats/chatReducer"
import messageReducer from "./messages/messageReducer"


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const history = createBrowserHistory()

const rootReducer = combineReducers({
    users: userReducer,
    chats: chatReducer,
    messages: messageReducer,
    router: connectRouter(history),
});

export const saveToLocalStorage = (state) => {
    try {
        const serializedState = JSON.stringify(state)
        localStorage.setItem("state", serializedState)
    } catch (e) {
        console.log("Save state to localstorage error")
    }
};

export const loadFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem("state")
        if (serializedState === null) {
            return undefined
        }
        return JSON.parse(serializedState)
    } catch (e) {
        return undefined
    }
};


const middleware = [thunkMiddleware, routerMiddleware(history)]

const enhancers = composeEnhancers(applyMiddleware(...middleware))

const persistedState = loadFromLocalStorage()

export const store = createStore(rootReducer, persistedState, enhancers)

store.subscribe(() => {
    saveToLocalStorage({
        users: {
            user: store.getState().users.user,
        },
    })
})
