const mongoose = require("mongoose")
const containerSchema = new mongoose.Schema({
    container_id: { type: String, required: true, unique: true  },
    name: { type: String, required: true },
    products_category:{ type: [String], required: true },
    adress: { type: [String], required: true },
    position: { type: [Number], required: true },
    description: {type: String, required: false}
})  

const Container = mongoose.model('container', containerSchema, "containers");

module.exports = Container