const isCateg = require("../../helpers/isCateg")
const sendErr = require("../../helpers/sendErrH")
const Container = require("../../models/container/container")

const filterContainers = async(req, res) => {
    try{
        const url = await req.url.split("?")
        const filters = url[1].split("=")[1] ? url[1].split("=")[1] : false
        const allContainers = await Container.find()

        if(!url || !filters || url[1].split("=")[0] !== "filters"){
            sendErr(res, "bed_request", 400)
            return
        }
        const filtered = []
        for(let i = 0; i < allContainers.length; i++){
            const elem = allContainers[i]
            const is = await isCateg(elem.products_category, filters)
            if(is){
                filtered.push(elem)
            }
        }
        res.status(200).json(filtered)
    }catch(error){
        console.log(error)
        sendErr(res, "bed_request", 400)
    }
}

module.exports = filterContainers