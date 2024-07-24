const getUsersByKey = require("../../../helpers/findMongoDb/users/getUsersByKey");
const sendErr = require("../../../helpers/sendErr");
const updateProfile = require("../../../helpers/updateMongoDb/profiles/updateProfile");
const updateUser = require("../../../helpers/updateMongoDb/users/updateUser");

const editProfile = async (req, res) => {
    const { change, user_id } = req.body;
    const userId = user_id || null;
    try {
        if (!userId || !change || change.password || change.role_type || change.user_id) {
            sendErr(res, "edit_user", 400);
            return;
        }
        const user = await getUsersByKey({ user_id: userId })
        if (!user) {
            sendErr(res, "User not found", 404);
            return;
        }
        if (change.products_category && change.products_category.length > 10) {
            delete change.products_category
        }
        const result = await updateUser(user_id, change, user.role_type)
        const profileResult = await updateProfile(user_id, change, user.role_type)
        if (result.nModified === 0 && profileResult.nModified === 0) {
            res.status(304).send("No changes made");
        } else {    
            res.status(200).send("User is updated!");
        }
    } catch (error) {
        console.error(error);
        sendErr(res, "int_server", 500);
    }
};

module.exports = editProfile;
