const isCateg = require("../../helpers/isCateg")
const sendErr = require("../../helpers/sendErrH")
const Products = require("../../models/products/products")

const searchProducts = async (req, res) => {
    try {
        const url = req.url.split("?")[1] ? req.url.split("?")[1].split("=") : false
        const search = url[1]
        if (url[0] !== "search") {
            sendErr(res, "bed_request", 400)
            return
        }
        
        const allProducts = await Products.find()
        if (!allProducts) sendErr(res, "not_found", 404)

        const findetProducts = []
        for (let i = 0; i < allProducts.length; i++) {
            const elim = allProducts[i].products
            for (let index = 0; index < elim.length; index++) {
                const product = elim[index]
                const isCtaegOk = await isCateg(product.categories, search)
                if(product.name.includes(search) || search.includes(product.name) || isCtaegOk){
                    findetProducts.push(product)
                }
            }
        }
        res.status(200).json(findetProducts)
    } catch (error) {
        console.log(error)
        sendErr(res, "bed_request", 400)
    }
}

module.exports = searchProducts