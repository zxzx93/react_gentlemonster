const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true, //공백제거
    unique: 1,
  },
  password: {
    type: String,
    minlength: 8,
  },
  role: {
    //관리자 1, 회원 0
    type: Number,
    default: 0,
  },
  // image: String,
  // token: {
  //   type: String,
  // },
  // tokenExp: {
  //   type: Number,
  // },
});
//첫번째 파라미터로 설정된 event가 일어나기 전(pre)에 먼저 callback 함수를 실행
// userSchema.pre('save', function(next) {
//   var user = this;
//   //비번 암호화
//   //isModified(): 해당 값이 db에 기록된 값과 비교해서 변경된 경우 true를, 그렇지 않은 경우 false를 반환
//   if (user.isModified('password')) {
//     bcrypt.genSalt(saltRounds, function(err, salt) {
//       if (err) return next(err);

//       bcrypt.hash(user.password, salt, function(err, hash) {
//         if (err) return next(err);
//         user.password = hash;
//         next();
//       });
//     });
//   } else {
//     next();
//   }
// });

//methods:document, static :collection 사용자 정의 메소드를 붙임
//Do not declare methods using ES6 arrow functions (=>). Arrow functions explicitly prevent binding this
// userSchema.methods.comparePassword = function (plainPassword, cb) {
//   bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
//     if (err) return cb(err);
//     cb(null, isMatch);
//   });
// };

//토큰 생성
// userSchema.methods.generateToken = function(cb) {
//   var user = this;
//   //console.log('user : ', user);

//   var token = jwt.sign(user._id.toHexString(), 'secretToken');
//   //var oneHour = moment()
//   //.add(1, 'hour')
//   // .valueOf();

//   // user.tokenExp = oneHour;
//   user.token = token;
//   user.save(function(err, user) {
//     if (err) return cb(err);
//     cb(null, user);
//   });
// };

// userSchema.statics.findByToken = function(token, cb) {
//   var user = this;

//   jwt.verify(token, 'secretToken', function(err, decoded) {
//     console.log(decoded); //_id값

//     User.findOne({ '_id': decoded, token: token }, function(err, user) {
//       if (err) cb(err);
//       cb(null, user);
//     });
//   });
// };

const User = mongoose.model('User', userSchema);

module.exports = { User };
