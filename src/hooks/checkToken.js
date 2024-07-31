const SECRET_KEY = process.env.JWT_SECRET
const jwt = require("jsonwebtoken");
const SellerUser = require("../models/user/sellerUser");
const checkToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);
    jwt.verify(token, SECRET_KEY, async(err, user) => {
      if (err) return res.sendStatus(403);
      const findedUser = await SellerUser.findOne({user_id: user.userId})
      req.user = findedUser;
      next();
    });
};

module.exports = checkToken