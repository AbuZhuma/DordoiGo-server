const checkReq = (req, res, next) => {
    if(!req.user){
        res.status(401).send("forbidden")
        return
    }else{
        next()
    }
}
module.exports = checkReq