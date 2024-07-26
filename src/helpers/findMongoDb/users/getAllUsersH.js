const User = require('../../../models/user/sellerUser')

const getAllUsers = async() => {
    try {
        const data = await User.find()
        return data
    } catch (error) {
        return error
    }
}

module.exports = getAllUsers   