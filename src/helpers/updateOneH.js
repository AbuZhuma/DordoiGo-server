const BuyerUser = require("../models/user/buyerUser")
const SellerUser = require("../models/user/sellerUser")
const BuyerProfile = require("../models/profile/buyerProfile")
const SellerProfile = require("../models/profile/sellerProfile")
const Products = require("../models/products/products")
const Container = require("../models/container/container")

const updateOneH = async(id, change, role, type) => {
    try {
        if(type === "users"){
            if(role === "seller"){
                const result = await SellerUser.updateOne(id, change)
                return result
            }else{
                const result = await BuyerUser.updateOne(id, change)
                return result
            }
        }
        if(type === "profiles"){
            if(role === "seller"){
                const result = await SellerProfile.updateOne(id, change)
                return result
            }else{
                const result = await BuyerProfile.updateOne(id, change)
                return result
            }
        }
        if(type === "containers"){
            const result = await Container.updateOne(id, change)    
            return result   
        }
        if(type === "products"){
            const result = await Products.updateOne(id, change)
            return result
        }
    } catch (error) {
        return error
    }
}

module.exports = updateOneH