const SellerUser = require("../../../models/user/sellerUser")
const BuyerUser = require("../../../models/user/buyerUser");

const updateUser = async (id, change, role) => {
    try {
        if (role === "seller") {
            const result = await SellerUser.updateOne({ user_id: id }, { $set: change })
            return result
        } else {
            const result = await BuyerUser.updateOne({ user_id: id }, { $set: change })
            return result
        }
    } catch (error) {
        return error
    }
}

module.exports = updateUser