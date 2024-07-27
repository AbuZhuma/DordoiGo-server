const BuyerUser = require("../models/user/buyerUser")
const SellerUser = require("../models/user/sellerUser")
const BuyerProfile = require("../models/profile/buyerProfile")
const SellerProfile = require("../models/profile/sellerProfile")
const Products = require("../models/products/products")

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
        if(type === "products"){
            if(role === "seller"){
                await Products.deleteOne(keys)
            }
            return
        }
    } catch (error) {
        return error
    }
}

module.exports = deleteOneH