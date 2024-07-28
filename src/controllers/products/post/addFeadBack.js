const sendErr = require("../../../helpers/sendErrH");
const checkFeadBack = require("../../../hooks/checkFeadBack");
const Products = require("../../../models/products/products");

const addFeadBack = async(req, res) => {
    try {
        const {container_id, product_id, fead_back} = req.body
        if (!container_id || !product_id || !fead_back) {
            sendErr(res, "bed_request", 400)
            return
        }
        const containerExist = await Products.findOne({container_id: container_id})
        const checkFb = await checkFeadBack(fead_back)
        if(containerExist && checkFb){
            containerExist.products.map((el) => {
                if(el.product_id === product_id){
                    el.fead_backs.push(fead_back)
                }
            })
            containerExist.save()
            res.status(200).send("Feadback added")
        }else{
            sendErr(res, "not_found", 404)
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = addFeadBack