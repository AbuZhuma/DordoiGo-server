const BuyerUser = require("../../../models/user/buyerUser")
const SellerUser = require("../../../models/user/sellerUser")
const genUserid = require("../../../helpers/genId")
const sendErr = require("../../../helpers/sendErr")
const SellerProfile = require("../../../models/profile/sellerProfile")
const BuyerProfile = require("../../../models/profile/buyerProfile")
const Product = require("../../../models/containers/container")
const generateRandomID = require("../../../helpers/genId")

const regUser = async (req, res) => {
    const { username, email, password, cpassword, role_type, contact_number } = req.body
    try {
        if (role_type !== "seller" && role_type !== "buyer") {
            sendErr(res, "role_type_reg", 500)
            return
        }
        if (username && username.length < 5) {
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
        const container_id = await generateRandomID(10);
        const optionsUser = {
            username: username,
            email: email,
            password: password,
            contact_number: contact_number,
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
            contact_number: contact_number,
            email: email,
            lastname: "",
            role_type: role_type,
            bio: ""
        }
        const optionsProduct = {
            container_id: container_id,
            products: []
        }
        if (role_type === "seller") {
            optionsUser.container_id = container_id
            optionsProfile.container_id = container_id
            const profile = new SellerProfile(optionsProfile)
            const products = new Product(optionsProduct)
            const user = new SellerUser(optionsUser)
            await user.save()
            await products.save()
            await profile.save()
        }else{
            const user = new BuyerUser(optionsUser)
            await user.save()
            const profile = new BuyerProfile(optionsProfile)
            await profile.save()
        }
        res.status(201).json({ message: "User registered!" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = regUser    