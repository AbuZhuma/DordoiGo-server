const errors = {
    role_type_reg: "invalid role_type: most be '(seller/buyer)",
    username_reg: "invalid username: most be (5>=)",
    password_reg: "invalid password: most be (5>=)",
    cpassword_reg: "invalid cpassword: most be (password === cpassword)",
    email_reg: "invalid email: most be (@!)",
    token_auth: "invalid request: most be (token!)",
    user_not_exist: "user not exist",
    users_not_list: "users not exist",
    bed_request: "bed request, check options",
    edit_user: "invalid options: most be (username/lastname/email/bio/prod_categ) or need change object",
    pass_not: "invalid password or username ",
    int_server: "Internal Server Error",
    user_not_seller:"This user is not seller",
    invalid_product:"Invalid product for adding"
}
module.exports = errors