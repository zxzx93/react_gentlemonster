// const { User } = require('../models/User');

// let auth = (req, res, next) => {
//   //클라이언트 쿠키에서 토큰 가져옴
//   const token = req.cookies.x_auth;
//   User.findByToken(token, (err, user) => {
//     if (err) throw err;
//     if (!user) res.json({ isAuth: false, err: true });
//     req.token = token;
//     req.user = user;
//     next();
//   });
// };

// module.exports = {
//   auth,
// };
