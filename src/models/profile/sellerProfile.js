const mongoose = require("mongoose")
const profileSchema = new mongoose.Schema({
    user_id: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    role_type: { type: String, required: true },
    email: { type: String,required: true, unique: true },
    lastname: { type: String, unique: false},
    bio: {type: String, unique: false},
    products_category: { type: [String] },
    contact_number: { type: String, required: true, unique: true },
    container_id: { type: String, required: true, unique: true }
})

const SellerProfile = mongoose.model('ProfileSeller', profileSchema, "profiles");

module.exports = SellerProfile