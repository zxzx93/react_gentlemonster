const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const dotenv = require('dotenv');
const passport = require('passport');
const passportConfig = require('./passport');

//const bodyParser = require('body-parser');
//const { auth } = require('./middleware/auth');

const config = require('./config/key');

dotenv.config();
const app = express();
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('MongoDB 연결 성공!!!');
  })
  .catch((err) => console.log(err));
passportConfig();

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true })); //클라이언트의 form값을 req.body에 넣음
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    secret: process.env.COOKIE_SECRET, //쿠키를 임의로 변조하는것을 방지하기 위한 값 입니다. 이 값을 통하여 세션을 암호화 하여 저장합니다.
    saveUninitialized: false, //세션을 사용하기 전까지는 세션 식별자(SID)를 발급하지 않도록 하는 옵션
    resave: false, //세션을 언제나 저장할 지 (변경되지 않아도) 정하는 값
    //store: sessionStorage,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  }),
);
app.use(passport.initialize()); // passport 동작
app.use(passport.session()); //passport.deserializeUser 실행

//route
app.use('/api/user', require('./routes/user'));

if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  // index.html for all page routes
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
  });
}

//errorHandler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server Listening on ${port}`);
});
