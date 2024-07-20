const mongoose = require("mongoose")
const productSchema = new mongoose.Schema({
    user_id: { type: String, required: true },
    products: [
        {
            name: { type: String, required: true },
            description: { type: String, required: true },
            price: { type: String, required: true },
            categories: { type: [String], required: true },
            img_urls: { type: [String], required: true },
            fead_backs: { type: [String] },
            product_id:  { type: String, required: true, unique: true },
        }
    ]
})

const Product = mongoose.model('Product', productSchema, "products");

module.exports = Product