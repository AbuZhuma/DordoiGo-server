const searchProduct = require("../../../helpers/getMongoDb/containers/searchProduct")
const sendErr = require("../../../helpers/sendErr")
const Containers = require("../../../models/containers/container")

const deleteProduct = async(req, res) => {
    const {container_id, product_id} = req.body
    try {
        const containerExist = await Containers.findOne({container_id: container_id})
        if(containerExist && containerExist.products.length){
            const i = await searchProduct(containerExist, product_id)
            containerExist.products.splice(i, i + 1)
            containerExist.save()
            res.status(200).send("Product is deleted")
            sendErr(res, "products_or_container_not", 404)
            return
        }else{
            sendErr(res, "products_or_container_not", 404)
            return
        }
    } catch (error) {
        console.log(error)
        sendErr(res, "bed_request", 400)
    }
}

module.exports = deleteProduct