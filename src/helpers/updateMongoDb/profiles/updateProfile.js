const Profiles = require("../../../models/profile/sellerProfile")
const BuyerProfile = require("../../../models/profile/buyerProfile");

const updateProfile = async(id, change, role) => {
    try {
        if(role === "seller"){
            const result = await Profiles.updateOne({ user_id: id }, { $set: change })
        return result 
        }else {
            const result = await BuyerProfile.updateOne({ user_id: id }, { $set: change })
            return result 
        }
        
    } catch (error) {
        return error
    }
}

module.exports = updateProfile