const getContainerByKey = require("../../../helpers/findMongoDb/containers/getContainerByKey")
const searchProduct = require("../../../helpers/findMongoDb/containers/searchProduct")
const sendErr = require("../../../helpers/sendErr")

const deleteProduct = async(req, res) => {
    const {container_id, product_id} = req.body
    try {
        const containerExist = await getContainerByKey({container_id: container_id})
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