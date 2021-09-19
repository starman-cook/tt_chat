const io = require('socket.io')(8333, {
    cors: {
        origin: "http://localhost:3000"
    }
})

let users = []

const addUser = (user, socketId) => {
    const check = users.find(u => u.userId === user.userId)
    if (!check) users.push({...user, socket: socketId})
}

const disconnectUser = (socketId) => {
    users = users.filter(u => u.socket !== socketId)
}

const getUser = async (receiver) => {
    return await users.find(u => u.userId === receiver.userId)
}

io.on("connection", (socket) => {
    socket.on("addUser", user => {
        addUser(user, socket.id)
        io.emit("showOnlineUsers", users)
    })

    socket.on("sendMessage", async (sender, receiver, message) => {
        const user = await getUser(receiver)
        try{
            io.to(user.socket).emit("getMessage", {
                ...sender,
                message
            })
        } catch (err) {
            console.log(err)
        }

    })


    socket.on("disconnect", () => {
        disconnectUser(socket.id)
    })
})