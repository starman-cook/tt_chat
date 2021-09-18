const express = require('express')
const app = express()
const port = 8000
const cors = require('cors')
const mongoose = require('mongoose')
const users = require('./routers/user')
const chats = require('./routers/chat')
const messages = require('./routers/message')
const config = require('./config')


mongoose.connect(config.mongoUrl.url + config.mongoUrl.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("Mongo connected")
    })
    .catch(err => {
        console.log(err)
    })


app.use(cors())
app.use(express.json())
app.use(express.static('public'))

app.use('/users', users)
app.use('/chats', chats)
app.use('/messages', messages)

app.listen(port, () => {
    console.log(`Server started on port ${port}!`);
});

