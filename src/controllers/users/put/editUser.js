const { comparePassword } = require("../../../helpers/hashing");
const sendErr = require("../../../helpers/sendErr");
const BuyerProfile = require("../../../models/profile/buyerProfile");
const SellerProfile = require("../../../models/profile/sellerProfile");
const User = require("../../../models/user/user");

const editUser = async (req, res) => {
    const { change, password, user_id } = req.body;
    const userId = user_id || null;
    try {
        if (!userId || !change || change.password || change.role_type || change.user_id) {
            sendErr(res, "edit_user", 400);
            return;
        }
        const user = await User.findOne({ user_id: userId })
        if (!user) {
            sendErr(res, "User not found", 404);
            return;
        }
        const isPassword = await comparePassword(password, user.password);
        if(change.products_category.length > 10){
            delete change.products_category
        }
        if (isPassword) {
            const result = await User.updateOne({ user_id: userId }, { $set: change });
            const profileResult = user.role_type === "seller" ?
            await SellerProfile.updateOne({ user_id: userId }, { $set: change }) :
            await BuyerProfile.updateOne({ user_id: userId }, { $set: change });

            if (result.nModified === 0 && profileResult.nModified === 0) {
                res.status(304).send("No changes made");
            } else {
                res.status(200).send("User is updated!");
            }
        } else {    
            sendErr(res, "Invalid password", 400);
        }
    } catch (error) {
        console.error(error);
        sendErr(res, "int_server", 500);
    }
};

module.exports = editUser;
