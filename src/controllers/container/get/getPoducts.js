const getContainerByKey = require("../../../helpers/getMongoDb/containers/getContainerByKey")
const sendErr = require("../../../helpers/sendErr")

const getProducts = async (req, res) => {
    const url = req.url ? req.url.split("?")[1].split("&") : ''
    try {
        if (url) {
            const container_id = url[0] ? url[0].split("=") : false
            const product_id = url[1] ? url[1].split("=") : false
            const containerExist = await getContainerByKey({ container_id: container_id[1] })
            if (containerExist) {
                if (container_id && product_id) {
                    const i = await searchProduct(containerExist, product_id[1])
                    res.status(200).json(containerExist.products[i])
                } else {
                    res.status(200).json(containerExist)
                }
            } else {
                sendErr(res, "not_found", 404)
            }

        } else {
            sendErr(res, "bed_request", 400)
        }
    } catch (error) {

    }
}

module.exports = getProducts