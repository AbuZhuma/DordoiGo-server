const Chat = require("../models/chat/chat")

const checkIsHaveChat = async(from, to) => {
    try {
        let iCp = true
        let err = null
        const isFromExistOnOne = await Chat.findOne({writer_one_id: from})  
        const isFromExistOnTwo = await Chat.findOne({writer_two_id: from})     
        if(isFromExistOnTwo && isFromExistOnTwo.writer_one_id === to){
            iCp = false
            err = "this kind-of chat already exist"
        }
        if(isFromExistOnOne && isFromExistOnOne.writer_two_id === to){
            iCp = false
            err = "this kind-of chat already exist"
        }
        return {iCp: iCp, err: err}
    } catch (error) {
        return {iCp: false, err: error}
    }
}
module.exports = checkIsHaveChat