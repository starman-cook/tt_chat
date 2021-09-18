import React, {useEffect, useState} from "react"
import './ChatPage.css'
import {useDispatch, useSelector} from "react-redux";
import {apiURL} from "../../apiURL";
import {getAllUserChats} from "../../store/chats/chatActions";
import {getAllChatMessages, sendChatMessage} from "../../store/messages/messageActions";
import Message from "../../components/Message/Message";

const ChatPage = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.users.user)
    const chats = useSelector(state => state.chats.chats)
    const messages = useSelector(state => state.messages.messages)
    const [input, setInput] = useState("")
    const [currentChatId, setCurrentChatId] = useState(null)

    let left
    let middle
    let right

    useEffect(() => {
        dispatch(getAllUserChats(user?._id))
    }, [])



    const getMessages = (chatId) => {
        setCurrentChatId(chatId)
        dispatch(getAllChatMessages(chatId))
    }
    if (chats.length) {
        left = chats.map(el => {
            const otherUser = el.participants.find(p => p.userId !== user._id)
            const imagePath = `${apiURL}/${otherUser?.userAvatar}`
            return <div onClick={() => {getMessages(el._id)}} key={otherUser.userId} className={"ChatPage__left_item"}>
                <img className={"ChatPage__chat__image"} src={imagePath} alt={otherUser.username}/>
                <p className={"ChatPage__chat__name"}>{otherUser.username}</p>
            </div>
        })
    }
    useEffect(() => {
        const arrImages = document.getElementsByClassName("Message__image")
        arrImages.length > 0 ? arrImages[arrImages.length - 1].style.display = "block" : console.log("no messages yet")
    }, [messages])

    if (messages.length) {
        middle = messages.map(el => {
            const myMessage = el.sender?.id === user._id
            const imagePath = `${apiURL}/${el.sender?.avatar}`

            return <Message
                key={el._id}
                image={imagePath}
                alt={el._id}
                message={el.message}
                myMessage={myMessage}
                username={el.sender?.username}
                date={el.createdAt}
            />
        })
    } else {
        middle = (<p>No messages yet</p>)
    }

    const submitMessage = () => {
        const obj = {
            chatId: currentChatId,
            sender: {
                id: user._id,
                username: user.username,
                avatar: user.avatar
            },
            message: input
        }
        dispatch(sendChatMessage(obj))
    }
    const inputHandler = (e) => {
        setInput(e.target.value)
    }

    return (
        <div className={"ChatPage"}>
            <div className={"ChatPage__mainContent"}>
                <div className={"ChatPage__left"}>
                    <p>My chats: </p>
                    {left}
                </div>
                <div className={"ChatPage__middle"}>
                    {middle}
                    {currentChatId && <div className={"ChatPage__middle__inputBlock"}>
                        <textarea className={"ChatPage__middle__textarea"} placeholder={"Type your message"} onChange={(event) => {inputHandler(event)}} />
                        <button disabled={(input).trim().length === 0} className={"ChatPage__middle__btn"} onClick={() => {submitMessage()}}>Send</button>
                    </div>}
                </div>

                <div className={"ChatPage__right"}>
                    {right}
                </div>


            </div>

        </div>
    )
}

export default ChatPage