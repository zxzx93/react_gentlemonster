const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const router = express.Router();

const { User } = require('../models/User');

//=================================
//             User
//=================================

router.post('/signup', async (req, res, next) => {
  try {
    console.log('req.body : ', req.body);

    const exUser = await User.findOne({
      email: req.body.email,
    }).exec();

    if (exUser) {
      return res
        .status(400)
        .json({ success: false, error: '이미 사용중인 이메일 입니다.' });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    res
      .status(201)
      .json({ success: true, text: '회원가입이 완료 되었습니다.' });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    console.log(err, user, info);
    if (err) {
      console.error(err);
      return next(err);
    }
    if (info) {
      return res.status(401).send(info.reason);
    }
    return req.login(user, async (loginErr) => {
      if (loginErr) {
        return next(loginErr);
      }
      // const fullUserWithoutPassword = await User.findOne({
      //   where: { id: user.id },
      //   attributes: {
      //     exclude: ['password'], //패스워드 빼고
      //   },
      //   include: [
      //     {
      //       model: Post,
      //       attributes: ['id'],
      //     },
      //     {
      //       model: User,
      //       as: 'Followings',
      //       attributes: ['id'],
      //     },
      //     {
      //       model: User,
      //       as: 'Followers',
      //       attributes: ['id'],
      //     },
      //   ],
      // });
      return res.status(200).json(user);
    });
  })(req, res, next);
});

// app.post('/login', (req, res) => {
//   User.findOne({ email: req.body.email }, (err, user) => {
//     if (!user) {
//       return res.json({
//         loginSuccess: false,
//         message: '제공된 이메일에 해당하는 유저가 없습니다.',
//       });
//     }
//     //요청된 이메일이 데이터 베이스에 있다면 비밀번호가 맞는 비밀번호인지 확인
//     user.comparePassword(req.body.password, (err, isMatch) => {
//       if (!isMatch)
//         return res.json({
//           loginSuccess: false,
//           message: '비밀번호가 틀렸습니다.',
//         });

//       //비밀번호 맞으면 토큰 생성
//       user.generateToken((err, user) => {
//         console.log(user);

//         if (err) {
//           return res.status(400).send(err);
//         }

//         res
//           .cookie('x_auth', user.token)
//           .status(200)
//           .json({ loginSuccess: true, userId: user._id });
//       });
//     });
//   });
// });

// app.get('/auth', auth, (req, res) => {
//   res.status(200).json({
//     _id: req.user._id,
//     idAdmin: req.user.role === 0 ? false : true,
//     isAuth: true,
//     email: req.user.email,
//     name: req.user.name,
//     lastname: req.user.lastname,
//     role: req.user.role,
//     image: req.user.image,
//   });
// });

// app.get('/logout', auth, (req, res) => {
//   User.findOneAndUpdate(
//     { '_id': req.body._id },
//     { 'token': '' },
//     (err, user) => {
//       if (err) res.status(400).json({ success: false });
//       res.status(200).json({ user, success: true });
//     },
//   );
// });

module.exports = router;
