const User = require("../../../models/user/user")
const genUserid = require("../../../helpers/genUserid")
const sendErr = require("../../../helpers/sendErr")
const SellerProfile = require("../../../models/profile/sellerProfile")
const BuyerProfile = require("../../../models/profile/buyerProfile")

const regUser = async (req, res) => {
    const { username, email, password, cpassword, role_type } = req.body
    try {
        if (role_type !== "seller" && role_type !== "buyer") {
            sendErr(res, "role_type_reg", 500)
            return
        }
        if (username.length < 5) {
            sendErr(res, "username_reg", 500)
            return
        }
        if (password !== cpassword || password.length < 5) {
            password !== cpassword ? sendErr(res, "cpassword_reg", 500) : sendErr(res, "password_reg", 500)
            return
        }
        if (!email || !email.includes("@")) {
            sendErr(res, "email_reg", 500)
            return
        }
        const userId = genUserid(15)
        const optionsUser = {
            username: username,
            email: email,
            password: password,
            user_id: userId,
            role_type: role_type,
            created_at: new Date(),
            is_active: true,
            lastname: "",
            bio: ""
        }
        const optionsProfile = {
            user_id: userId,
            username: username,
            email: email,
            lastname: "",
            role_type: role_type,
            bio: ""
        }
        const user = new User(optionsUser)
        await user.save()
        if (role_type === "seller") {
            optionsProfile.products_category = []
            const profile = new SellerProfile(optionsProfile)
            await profile.save()
        }else{
            const profile = new BuyerProfile(optionsProfile)
            await profile.save()
        }
        res.status(201).json({ message: "User registered!" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = regUser    