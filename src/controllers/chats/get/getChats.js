const sendErr = require("../../../helpers/sendErrH")
const Chat = require("../../../models/chat/chat")

const getChats = async(req, res) => {
    try {
        
    } catch (error) {
        console.log(error)
        sendErr(res, "bed_request", 400)
    }
}

module.exports = getChats