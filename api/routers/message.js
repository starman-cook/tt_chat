const express = require('express')
const auth = require('../middleware/auth')
const router = express.Router()
const Message = require('../models/Message')

// add auth!
router.post("/", auth, async (req, res) => {
    const message = new Message(req.body)
    try {
        await message.save()
        res.send(message)
    } catch (err) {
        res.status(500).send({error: err})
    }
})

router.get("/:chatId", auth, async (req, res) => {
    try {
        const messages = await Message.find({chatId: req.params.chatId})
        res.send(messages)
    } catch (err) {
        res.status(500).send({error: err})
    }
})

module.exports = router