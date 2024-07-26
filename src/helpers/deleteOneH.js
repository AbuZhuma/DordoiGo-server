const BuyerUser = require("../models/user/buyerUser")
const SellerUser = require("../models/user/sellerUser")
const BuyerProfile = require("../models/profile/buyerProfile")
const SellerProfile = require("../models/profile/sellerProfile")
const Containers = require("../models/containers/container")

const deleteOneH = async(keys, role, type) => {
    try {
        if(type === "users"){
            if(role === "seller"){
                await SellerUser.deleteOne(keys)
            }else{
                await BuyerUser.deleteOne(keys)
            }
            return
        }
        if(type === "profiles"){
            if(role === "seller"){
                await SellerProfile.deleteOne(keys)
            }else{
                await BuyerProfile.deleteOne(keys)
            }
            return
        }
        if(type === "containers"){
            if(role === "seller"){
                await Containers.deleteOne(keys)
            }
            return
        }
    } catch (error) {
        return error
    }
}

module.exports = deleteOneH