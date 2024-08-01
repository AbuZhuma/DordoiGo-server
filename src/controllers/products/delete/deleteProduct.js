const searchProduct = require("../../../helpers/searchProductH")
const sendErr = require("../../../helpers/sendErrH")
const Products = require("../../../models/products/products")

const deleteProduct = async (req, res) => {
    const {product_id } = req.body
    const {container_id} = req.user
    if(!container_id || !product_id){
        sendErr(res, "bed_request", 400)
        return
    }
    try {
        const productsExist = await Products.findOne({ container_id: container_id })
        if (productsExist && productsExist.products.length) {
            const i = await searchProduct(productsExist, product_id)
            if (i === false) {
                sendErr(res, "products_or_container_not", 404)
                return
            } else {
                productsExist.products.splice(i, i + 1)
                productsExist.save()
                res.status(200).send("Product is deleted")
                return
            }
        } else {
            sendErr(res, "products_or_container_not", 404)
            return
        }
    } catch (error) {
        sendErr(res, "bed_request", 400)
        console.log(error)
    }
}

module.exports = deleteProduct