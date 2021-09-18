import React from "react"
import './Header.css'
import {apiURL} from "../../apiURL";
import {logoutUser} from "../../store/users/userActions";
import {useDispatch} from "react-redux";
import { push } from 'connected-react-router'


const Header = (props) => {
    const user = props.user
    const dispatch = useDispatch()

    const logout = () => {
        dispatch(logoutUser())
    }

    let userInfo
    if (user) {
        const imagePath = `${apiURL}/${user.avatar}`
        userInfo = (
            <div className={"Header__userInfo"}>
                <img className={"Header__image"} src={imagePath} alt={user.username}/>
                <p className={"Header__name"}>{user.username}</p>
            </div>
        )
    }
    const goToLogin =() => {
        dispatch(push('/login'))
    }
    const goToRegister = () => {
        dispatch(push('/register'))
    }

    return (
        <div className={"Header"}>
            <div className={"Header__container"}>
                {userInfo}
                {user ?
                    <button className={"Header__btn"} onClick={() => {logout()}}>Logout</button>
                :
                <>
                    <p className={"Header__name"}>Welcome to chat app!</p>
                    <div>
                        <button className={"Header__btn"} onClick={() => {goToLogin()}}>Login</button>
                        <button className={"Header__btn"} onClick={() => {goToRegister()}}>Sign up</button>
                    </div>
                </>}
            </div>
        </div>
    )
}

export default Header