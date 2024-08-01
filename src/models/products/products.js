const mongoose = require("mongoose")
const productsSchema = new mongoose.Schema({
    container_id: { type: String, required: true },
    products: [
        {
            name: { type: String, required: true },
            description: { type: String, required: true },
            price: { type: String, required: true },
            categories: { type: [String], required: true },
            img_urls: { type: [String], required: true },
            fead_backs: { type: [{
                text: {type: String},
                time: {type: String},
            }] },
            product_id:  { type: String, required: true  },
        }
    ]
})

const Products = mongoose.model('products', productsSchema, "products");

module.exports = Products