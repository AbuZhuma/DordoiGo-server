const Container = require("../../../models/containers/container")

const getContainerByKey = async(keys) => {
    try {
        const data = await Container.findOne(keys)
        return data
    } catch (error) {
        return error
    }
}

module.exports = getContainerByKey   