const checkFeadBack = (feadback) => {
    let iCP = true
    if(feadback)
    if(!feadback.text){
        iCP = false
    }
    if(!feadback.time){
        iCP = false
    }
    return iCP
}

module.exports = checkFeadBack