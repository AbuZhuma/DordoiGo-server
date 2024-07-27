const sendErr = require("../../helpers/sendErrH")
const Products = require("../../models/products/products")

const isInclude = (obj, keys) => {
    let answ = false
    keys.map((el, i) => {
        const splited = el.split("=")
        if (obj && obj[splited[0]] && obj[splited[0]].includes(splited[1])) {
            answ = true
        }
    })
    return answ
}

const searchProducts = async (req, res) => {
    try {
        const url = req.url.split("?")
        const findetProducts = []
        const keys = url.slice(1, url.length)
        const productsPackage = await Products.find()
        const products = []
        for(let i = 0; i < productsPackage.length; i++){
            const element = productsPackage[i]
            for(let i = 0; i < element.products.length; i++){
                const el = element.products[i]
                products.push(el)
            } 
        }
        if (products) {
            for (let i = 0; i < products.length; i++) {
                const el = products[i];
                const isHave = await isInclude(el, keys)
                if (isHave) findetProducts.push(el)
            }
            res.status(200).json(findetProducts)
        } else {
            sendErr(res, "products_or_container_not", 404)
            return
        }
    } catch(error) {
        console.log(error)
        sendErr(res, "bed_request", 400)
    }
}

module.exports = searchProducts