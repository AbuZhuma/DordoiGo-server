const checkProduct = (product, tohave) => {
    let iCP = true
    let errOpt = null
    if (product && !tohave) {
        if (!product.name || (product.name && product.name.length < 5)) {
            errOpt = "invalid name"
            iCP = false
        } else if (!product.description || (product.description && product.description.length < 5)) {
            errOpt = "invalid description"
            iCP = false
        } else if (!product.price) {
            errOpt = "invalid price"
            iCP = false
        } else if (!product.categories || product.categories.length < 3) {
            errOpt = "invalid categories"
            iCP = false
        } else if (!product.img_urls) {
            errOpt = "invalid img_urls"
            iCP = false
        }
    }else if(product && tohave){
        if (product.name && product.name.length < 5) {
            errOpt = "invalid name"
            iCP = false
        } else if (product.description && product.description.length < 5){
            errOpt = "invalid description"
            iCP = false
        } else if (product.price && !product.price) {
            errOpt = "invalid price"
            iCP = false
        } else if (product.categories && product.categories.length < 3) {
            errOpt = "invalid categories"
            iCP = false
        } else if (product.img_urls && !product.img_urls) {
            errOpt = "invalid img_urls"
            iCP = false
        }
    } else {
        errOpt = "invalid product"
        iCP = false
    }
    return { iCP: iCP, err: errOpt }
}

module.exports = checkProduct