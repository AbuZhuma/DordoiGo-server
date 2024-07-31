const Chat = require("../models/chat/chat")
const Container = require("../models/container/container")
const Products = require("../models/products/products")
const BuyerProfile = require("../models/profile/buyerProfile")
const SellerProfile = require("../models/profile/sellerProfile")
const BuyerUser = require("../models/user/buyerUser")
const SellerUser = require("../models/user/sellerUser")

const newOneH = (options, type, role) => {
    if(!options || !type){
        return 
    }
    if(type === "users"){
        if(role === "seller"){
            const user = new SellerUser(options)
            return user
        }else{
            const user = new BuyerUser(options)
            return user
        }
    }
    if(type === "profiles"){
        if(role === "seller"){
            const profile = new SellerProfile(options)
            return profile
        }else{
            const profile = new BuyerProfile(options)
            return profile
        }
    }
    if(type === "container"){
        const container = new Container(options)
        return container
    }
    if(type === "products"){
        const products = new Products(options)
        return products
    }
}

module.exports = newOneH