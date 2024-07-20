const checkProduct = (product) => {
    const {name, description, price, categories, img_urls} = product
    let iCP = true
    let errOpt = null
    if(!name || (name && name.length < 5)){
        errOpt = "invalid name"
        iCP = false
    }else if(!description || (description && description.length < 5)){
        errOpt = "invalid description"
        iCP = false
    }else if(!price){
        errOpt = "invalid price"
        iCP = false
    }else if(!categories || categories.length < 3){
        errOpt = "invalid categories"
        iCP = false
    }else if(!img_urls){
        errOpt = "invalid img_urls"
        iCP = false
    }

    return {iCP: iCP, err: errOpt}
}

module.exports = checkProduct