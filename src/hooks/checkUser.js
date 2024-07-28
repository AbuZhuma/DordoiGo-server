const checkUser = (body, tohave) => {
    const { username, email, password, cpassword, role_type, contact_number, bio } = body
    if (!tohave) {
        if (role_type !== "seller" && role_type !== "buyer") {
            return "role_type_reg"
        }
        if (username && username.length < 5) {
            return "username_reg"
        }
        if (!password || password !== cpassword || password.length < 5) {
            if (password !== cpassword) {
                return "cpassword_reg"
            } else {
                return "password_reg"
            }
        }
        if (!email || !email.includes("@")) {
            return "email_reg"
        }
        if (!contact_number || !contact_number.length > 9) {
            return "contact_reg"
        }
        return "ok"
    }else{
        if (username && username.length < 5) {
            return "username_reg"
        }
        if (email && !email.includes("@")) {
            return "email_reg"
        }
        if (contact_number && !contact_number.length > 9) {
            return "contact_reg"
        }
        return "ok"
    }
}

module.exports = checkUser