const sendErr = require("../../../helpers/sendErrH");
const Chat = require("../../../models/chat/chat");
const SellerUser = require("../../../models/user/sellerUser");

const deleteChatInList = (list, chat_id) => {
    for (let i = 0; i < list.length; i++) {
        const el = list[i];
        if (chat_id === el) {
            list.splice(i, 1); 
            return; 
        }
    }
}

const deleteChat = async (req, res) => {
    try {
        const { chat_id } = req.body;
        const { user_id } = req.user;

        if (!chat_id) {
            sendErr(res, "bad_request", 400);
            return;
        }

        const isChatExist = await Chat.findOne({ chat_id: chat_id });

        if(!isChatExist){
            sendErr(res, "not_found", 404)
            return
        }

        if (isChatExist.writer_one_id && isChatExist.writer_two_id && isChatExist.writer_one_id !== user_id && isChatExist.writer_two_id !== user_id) {
            sendErr(res, "permissions_not", 401);
            return;
        }

        const deleteResult = await Chat.deleteOne({ chat_id: chat_id });

        if (deleteResult.deletedCount === 0) {
            sendErr(res, "chat_not_found", 404);
            return;
        }

        const one_writer = await SellerUser.findOne({ user_id: isChatExist.writer_one_id });
        const two_writer = await SellerUser.findOne({ user_id: isChatExist.writer_two_id });

        if (one_writer) {
            deleteChatInList(one_writer.chats, chat_id);
            await one_writer.save(); 
        }

        if (two_writer) {
            deleteChatInList(two_writer.chats, chat_id);
            await two_writer.save()
        }

        res.status(200).json({ message: "Chat deleted successfully" });
    } catch (error) {
        console.log(error);
        sendErr(res, "bad_request", 400);
    }
}

module.exports = deleteChat;
    