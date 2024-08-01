const sendErr = require("../../helpers/sendErrH")
const updateOneH = require("../../helpers/updateOneH")
const checkContainer = require("../../hooks/checkContainer")

const editContainer = async(req, res) => {
    try {
        const change = req.body
        const {container_id} = req.user
        if(!container_id || !change){
            sendErr(res, "bed_request", 400)
            return
        }
        const isContainerOkay =  change ? await checkContainer(change, true) : "!ok"    
        if(isContainerOkay === "ok" && container_id){
            if(change.container_id) delete change.container_id
            const updatedContainer = await updateOneH({container_id:container_id}, change, "seller", "containers")
            if (updatedContainer && updatedContainer.nModified === 0) {
                res.status(304).send("No changes made");
            } else {    
                res.status(200).send("Container is updated!");
            }
        }else{
            res.status(400).send(isContainerOkay)   
        }
    } catch (error) {
        console.log(error)
        sendErr(res, "bed_request", 400)
    }
}

module.exports = editContainer