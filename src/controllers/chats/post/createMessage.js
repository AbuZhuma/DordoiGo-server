const sendErr = require("../../../helpers/sendErrH")

const createMessage = async(req, res) => {
    try {
        
    } catch (error) {
        console.log(error)
        sendErr(res, "bed_request", 400)
    }
}

module.exports = createMessage