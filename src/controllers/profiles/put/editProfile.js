const sendErr = require("../../../helpers/sendErrH");
const updateOneH = require("../../../helpers/updateOneH");
const checkUser = require("../../../hooks/checkUser");
const SellerUser = require("../../../models/user/sellerUser");

const editProfile = async (req, res) => {
    const { change, user_id } = req.body;
    const userId = user_id || null;
    try {
        if(!change || !user_id){
            sendErr(res, "bed_request", 400)
        }
        const user = await SellerUser.findOne({ user_id: userId })
        if (!user) {
            sendErr(res, "not_found", 404);
            return;
        }
        const tohave = checkUser(change, true)
        if(tohave !== "ok"){
            sendErr(res, tohave, 500)
            return
        }
        if(change.password) delete change.password
        if(change.role_type) delete change.role_type
        if(change.created_at) delete change.created_at
        if(change.container_id) delete change.container_id
        if(change.user_id) delete change.user_id
        
        const result = await updateOneH({user_id: user_id}, change, user.role_type, "users")
        const profileResult = await updateOneH({user_id: user_id}, change, user.role_type, "profiles")
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
