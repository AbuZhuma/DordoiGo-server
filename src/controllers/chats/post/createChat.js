const generateRandomID = require("../../../helpers/genIdH")
const newOneH = require("../../../helpers/newOneH")
const sendErr = require("../../../helpers/sendErrH")
const updateOneH = require("../../../helpers/updateOneH")
const checkIsHaveChat = require("../../../hooks/checkIsHaveChat")
const Chat = require("../../../models/chat/chat")
const BuyerUser = require("../../../models/user/buyerUser")
const SellerUser = require("../../../models/user/sellerUser")

const createChat = async (req, res) => {
    try {
        const { from, to } = req.body
        const {user_id} = req.user
        if(from !== user_id){
            sendErr(res, "bed_request", 400)
            return
        }
        if (!from || !to) {
            sendErr(res, "bed_request", 400)
            return
        }
        const isFromExist = await SellerUser.findOne({ user_id: from })
        const isToExist = await SellerUser.findOne({ user_id: to })
        if (!isFromExist || !isToExist) {
            sendErr(res, "user_not_exist", 400)
            return
        }
        const checkHave = await checkIsHaveChat(from, to)
        if (!checkHave.iCp) {
            res.status(400).send(checkHave.err)
            return
        }
        const chat_id = await generateRandomID(10)
        const newChatOptions = {
            chat_id: chat_id,
            writer_one_id: from,
            writer_two_id: to,
            messages: [{
                from: "system",
                message: `${isFromExist.username} open the chat`,
                time: new Date(),
                edicated: false
            }],
            created_at: new Date(),
        }
        if (isFromExist.role_type === "seller") {
            await isFromExist.chats.push(chat_id)
            await isFromExist.save()
        } else {
            const user = await BuyerUser.findOne({ user_id: from })
            await user.chats.push(chat_id)
            await user.save()
        }
        if (isToExist.role_type === "seller") {
            await isToExist.chats.push(chat_id)
            await isToExist.save()
        } else {
            const user = await BuyerUser.findOne({ user_id: to })
            await user.chats.push(chat_id)
            await user.save()
        }
        const newChat = new Chat(newChatOptions)
        await newChat.save()
        res.status(200).json({
            message: "chat already created",
            chat_id: chat_id
        })
    } catch (error) {
        console.log(error)
        sendErr(res, "bed_request", 400)
    }
}

module.exports = createChat