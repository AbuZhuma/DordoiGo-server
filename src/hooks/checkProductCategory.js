const allCategorys = require("../store/allCategorys")

const checkProductCategory = (categorys) => {
    const allCateg = allCategorys
    let answ = "ok"
    for(let i = 0; i < categorys.length; i++){
        const el = categorys[i]
        let isOk = false
        for(let index = 0; index < allCateg.length; index++){
            const curEl = allCategorys[index]
            if(el === curEl){
                isOk = true
            }
        }
        if(!isOk){
            answ = "!ok"
            return
        }
    }
    return answ
}

module.exports = checkProductCategory