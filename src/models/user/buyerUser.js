const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const userSchema = new mongoose.Schema({
    user_id: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
    role_type: { type: String, required: true },
    email: { type: String,required: true, unique: true },
    created_at: { type: String, required: true },
    lastname: { type: String, unique: false},
    bio: {type: String, unique: false},
    is_active: { type: Boolean, required: true },
    contact_number: { type: String, required: true, unique: true }
})
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();      
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const BuyerUser = mongoose.model('BuyerUser', userSchema, "users");

module.exports = BuyerUser