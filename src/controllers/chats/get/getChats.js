const sendErr = require("../../../helpers/sendErrH")
const Chat = require("../../../models/chat/chat")

const getChats = async(req, res) => {
    try {
        const {chats} = req.user
        const findet = []
        for(let i = 0; i < chats.length; i++){
            const chat_id = chats[i]
            const chat = await Chat.findOne({chat_id: chat_id})
            findet.push(chat)
        }
        res.status(200).json(findet)
    } catch (error) {
        console.log(error)
        sendErr(res, "bed_request", 400)
    }
}

module.exports = getChats