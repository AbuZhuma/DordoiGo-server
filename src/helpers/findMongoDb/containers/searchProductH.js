const searchProduct = (containerExist, product_id) => {
    let result = false
    for (let i = 0; i < containerExist.products.length; i++) {
        const el = containerExist.products[i];
        if(el.product_id === product_id){
            result = i
        }
    }
    return result
}

module.exports = searchProduct