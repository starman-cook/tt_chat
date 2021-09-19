import React, {useEffect, useRef, useState} from "react"
import './ChatPage.css'
import {useDispatch, useSelector} from "react-redux";
import {apiURL} from "../../apiURL";
import {createChat, getAllUserChats, setCurrentChatId} from "../../store/chats/chatActions";
import {addMessage, getAllChatMessages, sendChatMessage} from "../../store/messages/messageActions";
import Message from "../../components/Message/Message";
import {getAllUsers} from "../../store/users/userActions";

const ChatPage = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.users.user)
    const chats = useSelector(state => state.chats.chats)
    const messages = useSelector(state => state.messages.messages)
    const [input, setInput] = useState("")
    const currentChatId = useSelector(state => state.chats.currentChatId)
    const users = useSelector(state => state.users.users)
    const scrollRef = useRef(null)
    let allUsers

    let left
    let middle
    let right

    useEffect(() => {
        dispatch(getAllUserChats(user?._id))
        dispatch(getAllUsers())
    }, [])



    const getMessages = (chatId) => {
        setInput("")
        dispatch(setCurrentChatId(chatId))
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
    const startChatting = async (interlocutor) => {
        const obj = {
            participants: [{
                userId: user._id,
                userAvatar: user.avatar,
                username: user.username
            }, {
                userId: interlocutor._id,
                userAvatar: interlocutor.avatar,
                username: interlocutor.username
            }]
        }
        setInput("")
        await dispatch(createChat(obj))
        await dispatch(getAllUserChats(user?._id))
    }

    if (users?.length) {
        let filteredUsers = users.filter(u => u._id !== user._id)
        allUsers = filteredUsers.map(el => {
            const imagePath = `${apiURL}/${el.avatar}`
            return <div onClick={() => {startChatting(el)}} key={el._id} className={"ChatPage__left_item"}>
                <img className={"ChatPage__chat__image"} src={imagePath} alt={el.username}/>
                <p className={"ChatPage__chat__name"}>{el.username}</p>
            </div>
        })
    }

    useEffect(() => {
        scrollRef.current?.scrollIntoView({behavior: "smooth"})
        const arrImages = document.getElementsByClassName("Message__image")
        arrImages.length > 0 ? arrImages[arrImages.length - 1].style.display = "block" : console.log("no messages yet")
    }, [messages])


    if (messages.length) {
        middle = messages.map(el => {
            const myMessage = el.sender?.id === user._id
            const imagePath = `${apiURL}/${el.sender?.avatar}`

            return <div className={myMessage ? "ChatPage__messageFrame ChatPage__messageFrame--myMessage" : "ChatPage__messageFrame"} ref={scrollRef}>
                        <Message
                        key={el._id}
                        image={imagePath}
                        alt={el._id}
                        message={el.message}
                        myMessage={myMessage}
                        username={el.sender?.username}
                        date={el.createdAt}
                        />
                    </div>
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
        dispatch(addMessage(obj))
        setInput("")
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
                    <p>All users:</p>
                    {allUsers}
                </div>

                <div className={"ChatPage__middle--frame"}>
                    <div className={"ChatPage__middle"}>
                        {middle}
                    </div>

                    {currentChatId && <div className={"ChatPage__middle__inputBlock"}>
                        <textarea value={input} className={"ChatPage__middle__textarea"} placeholder={"Type your message"} onChange={(event) => {inputHandler(event)}} />
                        <button disabled={(input).trim().length === 0} className={"ChatPage__middle__btn"} onClick={() => {submitMessage()}}>Send</button>
                    </div>}
                </div>
                <div className={"ChatPage__right"}>
                    <p>People online: </p>
                    {right}
                </div>


            </div>

        </div>
    )
}

export default ChatPage