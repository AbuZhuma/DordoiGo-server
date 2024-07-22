const sendErr = require("../../../helpers/sendErr");
const Product = require("../../../models/containers/container");
const BuyerProfile = require("../../../models/profile/buyerProfile");
const SellerProfile = require("../../../models/profile/sellerProfile");
const User = require("../../../models/user/buyerUser")

const deleteUser = async (req, res) => {
    const { user_id } = req.body
    try {
        const userExist = await User.findOne({ user_id: user_id })
        if (userExist) {
            await User.deleteOne({ user_id: user_id })
            userExist.role_type === "seller" ?
                await SellerProfile.deleteOne({ user_id: user_id }) :
                await BuyerProfile.deleteOne({ user_id: user_id }) 
            await Product.deleteOne({ user_id: user_id })
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