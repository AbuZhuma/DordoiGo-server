const Profiles = require('../../../models/profile/sellerProfile')

const getProfilesByKey = async(keys) => {
    try {
        const data = await Profiles.findOne(keys)
        return data
    } catch (error) {
        return error
    }
}

module.exports = getProfilesByKey   