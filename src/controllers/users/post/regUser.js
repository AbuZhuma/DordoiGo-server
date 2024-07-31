const genUserid = require("../../../helpers/genIdH")
const sendErr = require("../../../helpers/sendErrH")
const generateRandomID = require("../../../helpers/genIdH")
const checkUser = require("../../../hooks/checkUser")
const newOneH = require("../../../helpers/newOneH")
const checkContainer = require("../../../hooks/checkContainer")

const regUser = async (req, res) => {
    if(!req.body) {
        sendErr(res, "bed_request", 400)
        return
    }
    if(req.body.role_type && req.body.role === "seller" && !req.body.container_data){
        sendErr(res, "container_not", 400)
        return
    }
    const { username, email, password, role_type, contact_number, container_data } = req.body
    try {
        const userAnsw = await checkUser(req.body)
        if (userAnsw !== "ok") {
            sendErr(res, userAnsw, 400)
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
            bio: "",
            chats: []
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
        const createPosition = ''
        if (role_type === "seller") {
            const containerAnsw = await checkContainer(container_data, false)
            const optionsProduct = {
                container_id: container_id,
                products: []
            }
            if(containerAnsw !== "ok"){
                res.status(400).send(containerAnsw)
                return
            }
            const optionsContainer = {
                container_id: container_id,
                name: container_data.name, 
                products_category: container_data.products_category,
                adress: container_data.adress, 
                position: 1212,
                description: container_data.description
            }
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