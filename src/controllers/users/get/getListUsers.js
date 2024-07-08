const sendErr = require("../../../helpers/sendErr")
const User = require("../../../models/user/user")

const getListUsers = async(req, res) => {
    try {
        const url = req.url ? req.url.split("?")[1].split("=") : ''
        if(url[0] === "all"){
            const all_users = await User.find()
            res.status(200).json(all_users)
            return
        }else if(url[0] === "id" && url[1]){
            const user_by_id = await User.findOne({user_id: url[1]})
            res.status(200).json(user_by_id)
            return
        }else{
            sendErr(res, "bed_request", 500)
        }
    } catch (error) {
        sendErr(res, "users_not_list", 404)
    }    
}

module.exports = getListUsers