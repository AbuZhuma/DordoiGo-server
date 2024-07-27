const sendErr = require("../../../helpers/sendErrH");
const checkProduct = require("../../../hooks/checkProduct");
const Products = require("../../../models/products/products");

const editProduct = async (req, res) => {
    try {
        const { container_id, product_id, change } = req.body;
        if (container_id && product_id && change) {
            const containerExist = await Products.findOne({ container_id: container_id });
            const checkToHave = await checkProduct(change, true);
            if (containerExist && checkToHave.iCP) {
                let productUpdated = false;
                containerExist.products.forEach((el) => {
                    if (el.product_id === product_id) {
                        if (change.product_id) delete change.product_id
                        if (change.fead_backs) delete change.fead_backs
                        if (change.name) el.name = change.name;
                        if (change.description) el.description = change.description;
                        if (change.price) el.price = change.price;
                        if (change.categories) el.categories = change.categories;
                        if (change.img_urls) el.img_urls = change.img_urls;
                        productUpdated = true;
                    }
                });
                if (productUpdated) {
                    await containerExist.save();
                    res.status(200).send("Product is updated!");
                } else {
                    sendErr(res, "not_found", 404);
                }
            } else {
                sendErr(res, "bad_request", 400);
            }
        } else {
            sendErr(res, "bad_request", 400);
        }
    } catch (error) {
        console.log(error);
        sendErr(res, "bad_request", 400);
    }
}

module.exports = editProduct;
