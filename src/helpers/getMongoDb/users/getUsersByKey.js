const User = require('../../../models/user/user')

const getUsersByKey = async(keys) => {
    try {
        const data = await User.findOne(keys)
        return data
    } catch (error) {
        return error
    }
}

module.exports = getUsersByKey   