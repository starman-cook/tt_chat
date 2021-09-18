import React from 'react'
import './Message.css'
import moment from 'moment'

const Message = (props) => {
    const date = moment(props.date).format("DD-MM-YYYY")
    return (
        <div className={props.myMessage ? "Message myMessage" : "Message"}>
            <div className={"Message__header"}>
                {!props.myMessage && <img className={"Message__image"} src={props.image} alt={props.alt}/>}
                <p className={"Message__name"}>{props.username}</p>
            </div>
            <p className={"Message__text"}>{props.message}</p>
            <p className={"Message__date"}>{date}</p>
        </div>
    )
}

export default Message