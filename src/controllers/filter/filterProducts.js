const isCateg = require("../../helpers/isCateg")
const sendErr = require("../../helpers/sendErrH")
const Products = require("../../models/products/products")

const filterProducts = async(req, res) => {
    try {
        const url = await req.url.split("?")
        const filters = url[1].split("=")[1] ? url[1].split("=")[1] : false
        const allProducts = await Products.find()

        if(!url || !filters || url[1].split("=")[0] !== "filters"){
            sendErr(res, "bed_request", 400)
            return
        }
        const filtered = []
        for(let i = 0; i < allProducts.length; i++){
            const onePackage = allProducts[i].products
            for(let index = 0; index < onePackage.length; index++){
                const oneProduct = onePackage[index]
                const is = await isCateg(oneProduct.categories, filters)
                if(is){
                    filtered.push(oneProduct)
                }
            }
        }
        res.status(200).json(filtered)
    } catch (error) {
        console.log(error)
        sendErr(res, "bed_request", 400)
    }
}

module.exports = filterProducts