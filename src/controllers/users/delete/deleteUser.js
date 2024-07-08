const { comparePassword } = require("../../../helpers/hashing");
const sendErr = require("../../../helpers/sendErr");
const BuyerProfile = require("../../../models/profile/buyerProfile");
const SellerProfile = require("../../../models/profile/sellerProfile");
const User = require("../../../models/user/user")

const deleteUser = async(req, res) => {
    const {user_id, password} = req.body
    console.log(user_id, password);
    try {
        const userExist = await User.findOne({user_id: user_id})
        if(userExist){
            const checkPassword = await comparePassword(password, userExist.password)
            if(checkPassword){
                await User.deleteOne({user_id: user_id})
                userExist.role_type === "seller" ?
                await SellerProfile.deleteOne({user_id: user_id}) :
                await BuyerProfile.deleteOne({user_id: user_id})         
                res.status(200).send("User already deleted!")
            }
        }else{
            sendErr(res, "user_not_exist", 404)
        }
    } catch (error) {
        console.log(error)
        sendErr(res, "bed_request", 400)
    }
}

module.exports = deleteUser