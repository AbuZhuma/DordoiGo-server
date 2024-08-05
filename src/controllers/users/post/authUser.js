const { comparePassword } = require("../../../helpers/hashingH")
const sendErr = require("../../../helpers/sendErrH")
const jwt = require("jsonwebtoken")
const SellerUser = require("../../../models/user/sellerUser")
const config = require("../../../config")

const authUser = async (req, res) => {
    const { email, password } = req.body
    const SECRET_KEY = config.JWT_SECRET
    try {
        if(!email || !password){
            sendErr(res, "bed_request", 400)
            return
        }
        const user = await SellerUser.findOne({ email: email })
        if (user) {
            const checkPassword = await comparePassword(password, user.password)
            if (checkPassword) {
                const userId = user.user_id
                const token = jwt.sign({ userId }, SECRET_KEY, { expiresIn: '1h' });
                const answ = {
                    message: "user authorized!",
                    user_id: user.user_id,
                    token: token
                }
                res.status(201).json(answ);
            }else{
                sendErr(res, "token_auth", 401) 
            }
        }else{
            sendErr(res, "user_not_exist", 404)
        }
    } catch (error) {
        console.log(error)
        sendErr(res, "bed_request", 404)
    }
}

module.exports = authUser   