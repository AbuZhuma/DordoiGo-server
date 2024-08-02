const sendErr = require("../../../helpers/sendErrH")
const checkMassage = require("../../../hooks/checkMessage")
const Chat = require("../../../models/chat/chat")

const createMessage = async(req, res) => {
    try {
        const {chat_id, message} = req.body
        const {chats} = req.user_id
        if(!chats.includes(chat_id)){
            sendErr(res, "not_found", 404)
            return
        }
        const msgOkay = await checkMassage(message)
        if(!msgOkay.iCp){
            sendErr(res, "bed_message", 400)
            return
        }
        const chat = await Chat.findOne({chat_id: chat_id})
        chat.messages.push(message)
        await chat.save()
        res.status(200).send("message added")
    } catch (error) {
        console.log(error)
        sendErr(res, "bed_request", 400)
    }
}

module.exports = createMessage