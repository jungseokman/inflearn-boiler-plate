const express = require("express");
const app = express();
const port = 4000;
const bodyParser = require("body-parser");
const config = require("./config/key");
const { User } = require("./models/User");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => res.send("hello world 12123ㅇㄴㄹㅇㄴㄹsdsad"));

app.post("/register", (req, res) => {
  // 회원가입할 때 필요한 정보들을 클라이언트에서 가져오면 그것들을 데이터 베이스에 넣얻준다.
  const user = new User(req.body);

  user.save((err, userInfo) => {
    if (err) return res.json({ sucess: false, err });
    return res.status(200).json({
      sucess: true,
    });
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
