const express = require("express");
const app = express();
const port = 3000;

const config = require("./config/key");

const bodyParser = require("body-parser");
const { User } = require("./models/User");

// application/x-www-form-urlencoded로 가져온 데이타 사용을 위해
app.use(bodyParser.urlencoded({ extended: true }));
// application/json 로 가져온 데이타 사용을 위해
app.use(bodyParser.json());

const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
  })
  .then(() => console.log("Mongo DB Connected..."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World! welcome!!");
});

app.post("/register", async (req, res) => {
  // 회원 가입 할때 필요한 정보
  const user = new User(req.body);

  /**
   * mongoose 더이상 콜잭을 지원하지 않는다고 함...
   * - 그래서 수정
   */
  /*
  user.save((err, userInfo) => {
    // 에러발생시
    if (err) return res.json({ seccess: false, err });
    // 정상처리시
    return res.status(200).json({
      success: true,
    });
  });
  */
  const result = await user
    .save()
    .then(() => {
      res.status(200).json({
        success: true,
      });
    })
    .catch((err) => {
      res.json({ success: false, err });
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
