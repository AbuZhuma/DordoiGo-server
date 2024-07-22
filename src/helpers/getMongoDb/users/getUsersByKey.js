const User = require('../../../models/user/sellerUser')

const getUsersByKey = async(keys) => {
    try {
        const data = await User.findOne(keys)
        return data
    } catch (error) {
        return error
    }
}

module.exports = getUsersByKey   