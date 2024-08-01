const mongoose = require("mongoose")
const chatSchema = new mongoose.Schema({
    chat_id: { type: String, required: true, unique: true },
    writer_one_id: { type: String, required: true },
    writer_two_id: { type: String, required: true },
    messages:  { type: [
        {
            from: String,
            message: String,
            time: String, 
            edicated: String
        }
    ], required: true },
    created_at: { type: String, required: true, unique: true },
})  

const Chat = mongoose.model('chat', chatSchema, "chats");

module.exports = Chat