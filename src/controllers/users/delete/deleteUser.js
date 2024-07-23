const sendErr = require("../../../helpers/sendErr");
const Containers = require("../../../models/containers/container");
const BuyerProfile = require("../../../models/profile/buyerProfile");
const SellerProfile = require("../../../models/profile/sellerProfile");
const BuyerUser = require("../../../models/user/buyerUser");
const SellerUser = require("../../../models/user/sellerUser")

const deleteUser = async (req, res) => {
    const { user_id } = req.body
    try {
        const userExist = await SellerUser.findOne({ user_id: user_id })
        if (userExist) {
            if(userExist.role_type === "seller"){
                await SellerUser.deleteOne({ user_id: user_id })
                await SellerProfile.deleteOne({ user_id: user_id })
                await Containers.deleteOne({ container_id: userExist.container_id })    
            }else{
                await BuyerUser.deleteOne({ user_id: user_id })
                await BuyerProfile.deleteOne({ user_id: user_id })
            }
            res.status(200).send("User already deleted!")
        } else {
            sendErr(res, "user_not_exist", 404)
        }
    } catch (error) {
        console.log(error)
        sendErr(res, "bed_request", 400)
    }
}

module.exports = deleteUser