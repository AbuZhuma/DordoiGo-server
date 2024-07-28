const checkProductCategory = require("./checkProductCategory")

const checkContainer = async(cont, tohave) => {
    const {name, products_category, adress, position, description} = cont
    let answ = "ok"
    const isProductCategoryOkay = products_category? await checkProductCategory(products_category) : '!ok'
    if(!tohave){
        if(!name || (name && name.length < 5)) answ = "invalid container name"
        if(description && description.length < 5) answ = "invalid container description"
        if(!products_category || (products_category && !products_category.length) || (products_category && isProductCategoryOkay !== "ok")) answ = "invalid container product_category"
        if(!adress || (adress && adress.length < 5)) answ = "invalid container adress"
        if(!position || (position && position.length < 5) || (position && typeof position !== "number")) answ = "invalid container position"
    }
    if(tohave){
        if(name && name.length < 5) answ = "invalid container name"
        if(description && description.length < 5) answ = "invalid container description"
        if((products_category && !products_category.length) || (products_category && isProductCategoryOkay !== "ok")) answ = "invalid container product_category"
        if(adress && adress.length < 5) answ = "invalid container adress"
        if((position && position.length < 5) || (position && typeof position !== "number")) answ = "invalid container position"
    }
    return answ
}

module.exports = checkContainer