const Product = require("../../../models/product/product")

const getProductByKey = async(keys) => {
    try {
        const data = await Product.findOne(keys)
        return data
    } catch (error) {
        return error
    }
}

module.exports = getProductByKey   