const Profiles = require('../../../models/profile/sellerProfile')

const getAllProfiles = async() => {
    try {
        const data = await Profiles.find()
        return data
    } catch (error) {
        return error
    }
}

module.exports = getAllProfiles 