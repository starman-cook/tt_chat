const express = require('express')
const auth = require('../middleware/auth')
const router = express.Router()
const Chat = require('../models/Chat')


router.post("/", auth, async (req, res) => {
    const chat = new Chat(req.body)
    try {
        await chat.save()
        res.send(chat)
    } catch (err) {
        res.status(500).send({error: err})
    }
})

router.get("/:userId", auth, async (req, res) => {
    try {
        const chats = await Chat.find({"participants.userId" : req.params.userId})
        res.send(chats)
    } catch (err) {
        res.status(500).send({error: err})
    }
})

module.exports = router