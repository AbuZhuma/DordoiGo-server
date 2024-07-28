const isCateg = require("../../helpers/isCateg")
const sendErr = require("../../helpers/sendErrH")
const Container = require("../../models/container/container")

const searchContainers = async(req, res) => {
    try {
        const url = req.url.split("?")
        const search = url[1] ? url[1].split("=") : false
        if(!search){
            sendErr(res, "bed_request", 400)
            return
        }
        
        const allContainers = await Container.find()
        const findetContainers = []
        for(let i = 0; i < allContainers.length; i++){
            const cont = allContainers[i]
            const is = await isCateg(cont.products_category, search[1])
            if(cont.name.includes(search[1]) || search[1].includes(cont.name) || is) findetContainers.push(cont)
        }
        res.status(200).json(findetContainers)
    } catch (error) {
        console.log(error)
        sendErr(res, "bed_request", 400) 
    }
}

module.exports = searchContainers