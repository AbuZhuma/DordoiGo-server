const getUsersByKey = require("../../../helpers/getMongoDb/users/getUsersByKey")
const { comparePassword } = require("../../../helpers/hashing")
const sendErr = require("../../../helpers/sendErr")
const SECRET_KEY = process.env.JWT_SECRET
const jwt = require("jsonwebtoken")

const authUser = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await getUsersByKey({ email: email })
        if (user) {
            const checkPassword = await comparePassword(password, user.password)
            if (checkPassword) {
                const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' });
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
        sendErr(res, "user_not_exist", 404)
    }
}

module.exports = authUser   