const jwt = require("jsonwebtoken");
const SellerUser = require("../models/user/sellerUser");
const SECRET_KEY = process.env.JWT_SECRET;

const useUserForToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, SECRET_KEY, async (err, user) => {
      if (err) return resolve(false);
      try {
        const findedUser = await SellerUser.findOne({ user_id: user.userId });
        resolve(findedUser);
      } catch (error) {
        reject(error);
      }
    });
  });
};

module.exports = useUserForToken;
