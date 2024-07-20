const generateRandomID = require("../../../helpers/genUserid");
const getUsersByKey = require("../../../helpers/getMongoDb/users/getUsersByKey");
const sendErr = require("../../../helpers/sendErr");
const checkProduct = require("../../../hooks/checkProduct");
const Product = require("../../../models/product/product");

const addProduct = async (req, res) => {
    const { user_id, product } = req.body;
    const user = await getUsersByKey({ user_id: user_id });
    const isCorrectProducts = checkProduct(product);

    if (!user) {
        sendErr(res, "user_not_exist", 404);
        return;
    }

    if (user.role_type !== "seller") {
        sendErr(res, "user_not_seller", 400);
        return;
    }

    if (!isCorrectProducts.iCP) {
        res.status(400).send(isCorrectProducts.err);
        return;
    }

    const curProducts = await Product.findOne({ user_id: user_id });
    const product_id = await generateRandomID(10);
    product.product_id = product_id;

    curProducts.products.push(product);

    const updatedProduct = await curProducts.save();

    if (!updatedProduct) {
        res.status(304).send("No changes made");
    } else {
        res.status(200).send("Product is added");
    }
};

module.exports = addProduct;
