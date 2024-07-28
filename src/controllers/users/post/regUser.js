const genUserid = require("../../../helpers/genIdH")
const sendErr = require("../../../helpers/sendErrH")
const generateRandomID = require("../../../helpers/genIdH")
const checkUser = require("../../../hooks/checkUser")
const newOneH = require("../../../helpers/newOneH")
const checkContainer = require("../../../hooks/checkContainer")

const regUser = async (req, res) => {
    if(!req.body.container_data || !req.body) {
        sendErr(res, "container_not", 400)
        return
    }
    const { username, email, password, role_type, contact_number, container_data } = req.body
    const {name, products_category, adress, position, description} = container_data
    try {
        const userAnsw = await checkUser(req.body)
        const containerAnsw = await checkContainer(container_data, false)
        if (userAnsw !== "ok") {
            sendErr(res, userAnsw, 400)
            return
        }
        if(containerAnsw !== "ok"){
            res.status(400).send(containerAnsw)
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
        const optionsContainer = {
            container_id: container_id,
            name: name, 
            products_category: products_category,
            adress: adress, 
            position: position,
            description: description
        }
        if (role_type === "seller") {
            optionsUser.container_id = container_id
            optionsProfile.container_id = container_id
            const container = await newOneH(optionsContainer, "container")
            const products = await newOneH(optionsProduct, "products")
            await products.save()
            await container.save()
        }   
        const profile = await newOneH(optionsProfile, "profiles", role_type)
        const user = await newOneH(optionsUser, "users", role_type)
        await user.save()
        await profile.save()
        res.status(201).json({ message: "User registered!" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
}

module.exports = regUser    