const { log } = require("console")
const getContainerByKey = require("../../../helpers/getMongoDb/containers/getContainerByKey")
const sendErr = require("../../../helpers/sendErr")

const getAllProducts = async (req, res) => {
    try {
        const container_id = await req.url ? req.url.split("?")[1] : ''
        if(container_id){
            const containerExist = await getContainerByKey({container_id: container_id})
            if(containerExist){
                res.status(200).json(containerExist.products)
            }else{
                sendErr(res, "not_fount", 4040)
            }
        }
    } catch (error) {
        sendErr(res, "bed_request", 400)
        console.log(error);
    }
}

module.exports = getAllProducts