const searchProduct = (containerExist, product_id) => {
    for (let i = 0; i < containerExist.products.length; i++) {
        const el = containerExist.products[i];
        if(el.product_id === product_id){
            return i
        }   
    }
}

module.exports = searchProduct