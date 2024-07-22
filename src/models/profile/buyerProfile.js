const mongoose = require("mongoose")
const profileSchema = new mongoose.Schema({
    user_id: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    role_type: { type: String, required: true },
    email: { type: String,required: true, unique: true },
    lastname: { type: String, unique: false},
    bio: {type: String, unique: false},
    contact_number: { type: String, required: true, unique: true }
})

const BuyerProfile = mongoose.model('ProfileBuyer', profileSchema, "profiles");

module.exports = BuyerProfile