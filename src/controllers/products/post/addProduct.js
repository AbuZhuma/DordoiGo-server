const generateRandomID = require("../../../helpers/genIdH");
const sendErr = require("../../../helpers/sendErrH");
const checkProduct = require("../../../hooks/checkProduct");
const SellerUser = require("../../../models/user/sellerUser");
const Products = require("../../../models/products/products");

const addProduct = async (req, res) => {
    try {
        const product = req.body;
        const {container_id} = req.user
        if (!container_id || !product) {
            sendErr(res, "bed_request", 400)    
            return
        }
        const user = await SellerUser.findOne({ container_id: container_id });
        const isCorrectProducts = await checkProduct(product);

        if (!user) {
            sendErr(res, "products_or_container_not", 404);
            return;
        }

        if (user.role_type && user.role_type !== "seller") {
            sendErr(res, "user_not_seller", 400);
            return;
        }

        if (!isCorrectProducts.iCP) {
            res.status(400).send(isCorrectProducts.err);
            return;
        }
        const curProducts = await Products.findOne({ container_id: container_id })
        const product_id = await generateRandomID(10);
        product.product_id = product_id;

        curProducts.products.push(product);

        const updatedProduct = await curProducts.save();

        if (!updatedProduct) {
            res.status(304).send("No changes made");
        } else {
            res.status(200).send("Product is added");
        }
    } catch (error) {
        console.log(error)
        sendErr(res, "bed_request", 400)
    }

};

module.exports = addProduct;
