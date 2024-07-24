const getAllProfiles = require("../../../helpers/findMongoDb/profiles/getAllProfiles")
const getProfilesByKey = require("../../../helpers/findMongoDb/profiles/getProfileByKey")
const sendErr = require("../../../helpers/sendErr")

const getListUsers = async (req, res) => {
    try {
        const url = req.url ? req.url.split("?")[1].split("=") : ''
        if (url[0] === "all") {
            const all_profiles = await getAllProfiles()
            res.status(200).json(all_profiles)
            return
        } else if (url[0] === "id" && url[1]) {
            const profile_by_id = await getProfilesByKey({ user_id: url[1] })
            res.status(200).json(profile_by_id)
            return
        } else {
            sendErr(res, "bed_request", 500)
        }
    } catch (error) {
        sendErr(res, "users_not_list", 404)
    }
}

module.exports = getListUsers