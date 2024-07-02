const User = require("../../models/user/user")
const genUserid = require("../../helpers/genUserid")

const sendErr = (msg, res) => {
    res.status(500).json({ message: msg })
    return
}

const regUser = async (req, res) => {
    const { username, email, password, cpassword, role_type } = req.body
    try {
        if (role_type !== "seller" && role_type !== "buyer") {
            sendErr("role_type is incorrect(seller/buyer)", res)
        }

        if (username.length < 5) {
            sendErr("username is incorrect, username length > 5", res)
        }

        if (password !== cpassword || password.length < 5) {
            sendErr("password is incorrect, password length > 5, cpassword !== password", res)
        }

        if (!email) {
            sendErr("email is incorrect, @!", res)
        }

        const user_id = genUserid(15)
        const created_at = new Date()
        const user = new User({ username, email, password, user_id, role_type, created_at })
        await user.save()
        res.status(201).json({ message: "User registered!" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = regUser