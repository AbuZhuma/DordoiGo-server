const isCateg = (categ, search) => {
    let is = false
    for(let i = 0; i < categ.length; i++){
        if(categ[i].includes(search) || search.includes(categ[i])){
            is = true
        }
    }
    return is
}

module.exports = isCateg