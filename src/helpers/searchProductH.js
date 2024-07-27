const searchProduct = (products, product_id) => {
    let result = false
    for (let i = 0; i < products.products.length; i++) {
        const el = products.products[i];
        if(el.product_id === product_id){
            result = i
        }
    }
    return result
}

module.exports = searchProduct