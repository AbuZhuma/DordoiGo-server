const generateRandomID = require("../../../helpers/genId");
const getContainerByKey = require("../../../helpers/getMongoDb/containers/getContainerByKey");
const getUsersByKey = require("../../../helpers/getMongoDb/users/getUsersByKey");
const sendErr = require("../../../helpers/sendErr");
const checkProduct = require("../../../hooks/checkProduct");

const addProduct = async (req, res) => {
    const { container_id, product } = req.body;
    const user = await getUsersByKey({ container_id: container_id });
    const isCorrectProducts = checkProduct(product);

    if (!user) {
        sendErr(res, "products_or_container_not", 404);
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
    
    const curProducts = await getContainerByKey({container_id: container_id})
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
