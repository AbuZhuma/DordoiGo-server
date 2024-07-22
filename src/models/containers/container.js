const mongoose = require("mongoose")
const containerSchema = new mongoose.Schema({
    container_id: { type: String, required: true },
    products: [
        {
            name: { type: String, required: true },
            description: { type: String, required: true },
            price: { type: String, required: true },
            categories: { type: [String], required: true },
            img_urls: { type: [String], required: true },
            fead_backs: { type: [String] },
            product_id:  { type: String, required: true },
        }
    ]
})

const Container = mongoose.model('container', containerSchema, "containers");

module.exports = Container