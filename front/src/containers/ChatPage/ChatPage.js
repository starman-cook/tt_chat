import React, {useEffect, useRef, useState} from "react"
import './ChatPage.css'
import {useDispatch, useSelector} from "react-redux";
import {apiURL} from "../../apiURL";
import {createChat, getAllUserChats, setCurrentChat} from "../../store/chats/chatActions";
import {addMessage, getAllChatMessages, sendChatMessage} from "../../store/messages/messageActions";
import Message from "../../components/Message/Message";
import {getAllUsers} from "../../store/users/userActions";
import {io} from 'socket.io-client'

const ChatPage = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.users.user)
    const chats = useSelector(state => state.chats.chats)
    const messages = useSelector(state => state.messages.messages)
    const [input, setInput] = useState("")
    const currentChat = useSelector(state => state.chats.currentChat)
    const users = useSelector(state => state.users.users)
    const scrollRef = useRef(null)
    const socket = useRef(io("ws://localhost:8333"))
    const [onlineUsers, setOnlineUsers] = useState([])
    const [gettingMessage, setGettingMessage] = useState(null)
    let allUsers


    let left
    let middle
    let right

    useEffect(() => {
        socket.current.emit("addUser", {userId: user._id, username: user.username, avatar: user.avatar})
        socket.current.on("showOnlineUsers", users => {
            setOnlineUsers(users.filter(u => u.userId !== user._id))
        })
    }, [user])


    useEffect(() => {
        socket.current.on("getMessage", data => {
            const obj = {
                sender: {
                    id: data.userId,
                    username: data.username,
                    avatar: data.avatar
                },
                message: data.message
            }
            setGettingMessage(obj)
        })
        drawLastAvatar()
        dispatch(getAllUserChats(user?._id))
        dispatch(getAllUsers())
    }, [])

    useEffect(() => {
        gettingMessage && currentChat && currentChat?.participants.find(p => p.userId === gettingMessage?.sender.id) && dispatch(addMessage(gettingMessage))
        drawLastAvatar()
    }, [gettingMessage])



    const getMessages = (chat) => {
        setInput("")
        dispatch(setCurrentChat(chat))
        dispatch(getAllChatMessages(chat._id))
    }
    if (chats.length) {
        left = chats.map((el, i) => {
            const otherUser = el.participants.find(p => p.userId !== user._id)
            const imagePath = `${apiURL}/${otherUser?.userAvatar}`
            return <div onClick={() => {getMessages(el)}} key={i} className={"ChatPage__left_item"}>
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
                userId: interlocutor._id || interlocutor.userId,
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
        allUsers = filteredUsers.map((el, i) => {
            const imagePath = `${apiURL}/${el.avatar}`
            return <div onClick={() => {startChatting(el)}} key={i} className={"ChatPage__left_item"}>
                <img className={"ChatPage__chat__image"} src={imagePath} alt={el.username}/>
                <p className={"ChatPage__chat__name"}>{el.username}</p>
            </div>
        })
    }

    const drawLastAvatar = () => {
        const arrImages = document.getElementsByClassName("Message__image")
        for (let i = 0; i < arrImages.length; i++) {
            arrImages[i].style.display = "none"
        }
        arrImages.length > 0 ? arrImages[arrImages.length - 1].style.display = "block" : console.log("no interlocutor messages yet")
    }

    useEffect(() => {
        scrollRef.current?.scrollIntoView({behavior: "smooth"})
        drawLastAvatar()
    }, [messages])


    if (messages.length) {
        middle = messages.map((el, i) => {
            const myMessage = el.sender?.id === user._id
            const imagePath = `${apiURL}/${el.sender?.avatar}`

            return <div key={i} className={myMessage ? "ChatPage__messageFrame ChatPage__messageFrame--myMessage" : "ChatPage__messageFrame"} ref={scrollRef}>
                        <Message
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

    const startOrGetMessages = async (user) => {
        console.log(user)
        let checkChats = null
        chats.forEach(el => {
            if (el.participants.find(p => p.userId === user.userId)) {
                checkChats = el
            }
        })
        if (checkChats) {
            getMessages(checkChats)
        } else {
            await startChatting(user)
        }
    }

    if (onlineUsers.length) {
        right = onlineUsers.map((el, i) => {
            const imagePath = `${apiURL}/${el.avatar}`
            return <div onClick={() => {startOrGetMessages(el)}} key={i} className={"ChatPage__left_item"}>
                <img className={"ChatPage__chat__image"} src={imagePath} alt={el.username}/>
                <p className={"ChatPage__chat__name"}>{el.username}</p>
            </div>
        })
    }

    const submitMessage = () => {
        const obj = {
            chatId: currentChat._id,
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
        const receiver = currentChat.participants.find(p => p.userId !== user._id)
        socket.current.emit("sendMessage", {
            userId: user._id, username: user.username, avatar: user.avatar
        } ,
            receiver,
            input

        )
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

                    {currentChat?._id && <div className={"ChatPage__middle__inputBlock"}>
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