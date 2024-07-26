const getContainerByKey = require("../../../helpers/findMongoDb/containers/getContainerByKeyH")
const searchProduct = require("../../../helpers/findMongoDb/containers/searchProductH")
const sendErr = require("../../../helpers/sendErrH")

const deleteProduct = async (req, res) => {
    const { container_id, product_id } = req.body
    try {
        const containerExist = await getContainerByKey({ container_id: container_id })
        if (containerExist && containerExist.products.length) {
            const i = await searchProduct(containerExist, product_id)
            if (i === false) {
                sendErr(res, "products_or_container_not", 404)
                return
            } else {
                containerExist.products.splice(i, i + 1)
                containerExist.save()
                res.status(200).send("Product is deleted")
                return
            }
        } else {
            sendErr(res, "products_or_container_not", 404)
            return
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = deleteProduct