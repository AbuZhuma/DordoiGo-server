const mongoose = require("mongoose")
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: String, required: true},
    categories: { type: [String], required: true },
    img_urls: { type: [String], required: true },
    fd_backs: { type: [String] },
})

const Product = mongoose.model('Product', productSchema, "products");

module.exports = Product