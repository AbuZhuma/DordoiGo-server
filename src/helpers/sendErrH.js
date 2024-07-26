const errors = require("../store/allErrors");

const sendErr = (res, key, code) => {
    res.status(code).json({ message: errors[key]})
}

module.exports = sendErr