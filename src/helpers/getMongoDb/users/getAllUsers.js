const User = require('../../../models/user/user')

const getAllUsers = async() => {
    try {
        const data = await User.find()
        return data
    } catch (error) {
        return error
    }
}

module.exports = getAllUsers   