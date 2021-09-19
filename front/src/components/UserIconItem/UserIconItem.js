import React from "react";
import './UserIconItem.css'
import {apiURL} from "../../apiURL";


const UserIconItem = (props) => {
    const imagePath = `${apiURL}/${props.avatar}`

    return (
    <div onClick={props.click} className={"UserIconItem"}>
        <img className={"UserIconItem__image"} src={imagePath} alt={props.username}/>
        <p className={"UserIconItem__name"}>{props.username}</p>
    </div>
    )
}


export default UserIconItem