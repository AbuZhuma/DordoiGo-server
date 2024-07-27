const sendErr = require("../../../helpers/sendErrH")
const Products = require("../../../models/products/products")

const getAllProducts = async (req, res) => {
    try {
        const container_id = await req.url ? req.url.split("?")[1] : ''
        if(container_id){
            const productsExist = await Products.findOne({container_id: container_id})
            if(productsExist){
                res.status(200).json(productsExist.products)
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