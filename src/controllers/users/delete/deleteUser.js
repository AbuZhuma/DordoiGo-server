const deleteOneH = require("../../../helpers/deleteOneH");
const sendErr = require("../../../helpers/sendErrH");
const SellerUser = require("../../../models/user/sellerUser")

const deleteUser = async (req, res) => {
    const { user_id } = req.body
    try {
        if(!user_id){
            sendErr(res, "bed_request", 400)
            return
        }
        const userExist = await SellerUser.findOne({ user_id: user_id })
        if (userExist) {
            await deleteOneH({ user_id: user_id }, userExist.role_type, "users")
            await deleteOneH({ user_id: user_id }, userExist.role_type, "profiles")
            if (userExist.role_type === "seller") {
                await deleteOneH({ container_id: userExist.container_id }, userExist.role_type, "products")
                await deleteOneH({ container_id: userExist.container_id }, userExist.role_type, "containers")
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