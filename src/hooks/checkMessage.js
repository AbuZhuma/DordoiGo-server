
const checkMassage = async(msg) => {
    try {
        let iCp = true
        if(!msg){
            iCp = false
        }
        if(!msg.from || !msg.message || !msg.time || msg.edicated){
            iCp = false
        }
        return { iCp: iCp }
    } catch (error) {
        return { iCp: false}
    }
}

module.exports = checkMassage