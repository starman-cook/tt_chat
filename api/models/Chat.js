const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ChatSchema = new Schema({
               participants: Array
            },
    {timestamps: true})


const Chat = mongoose.model('Chat', ChatSchema);
module.exports = Chat;