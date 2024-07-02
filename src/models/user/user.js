const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const userSchema = new mongoose.Schema({
    user_id: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
    role_type: { type: String, required: true },
    email: { type: String,required: true, unique: true },
    created_at: { type: String, required: true },

    lastname: { type: String, unique: true },
    access_token: { type: String, unique: true },
    refresh_token: { type: String, unique: true },
    isOnline: { type: Boolean },
    isActive: { type: Boolean },
})
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const User = mongoose.model('User', userSchema, "users");

module.exports = User