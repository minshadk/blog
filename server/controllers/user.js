const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.register = async (req, res) => {
  console.log("register");
  const userName = req.body.userName;
  const email = req.body.email;
  const password = req.body.password;
  if (!userName || !email || !password) {
    return res.status(400).json({ status: "failed", message: "bad request" });
  }
  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = new User({
    userName: userName,
    email: email,
    password: hashedPassword,
  });

  try {
    const newUser = await user.save();
    return res
      .status(200)
      .json({ status: "success", data: { userName: user.userName } });
  } catch (err) {
    return res.status(401).send(err);
  }
};

exports.login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  if (!email || !password) {
    return res.status(400).json({ status: "failed", message: "bad request" });
  }
  try {
    const user = await User.findOne({ email: email });

    console.log(user);

    if (!user) return res.status(400).send("Invalid user credentials");
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword)
      return res.status(400).send("invalid user credentials password");
    else {
      token = jwt.sign(
        {
          _id: user._id,
          userName: user.userName,
        },
        process.env.SECRET_KEY
      );
      return res
        .status(200)
        .header("authToken", token)
        .json({
          status: "success",
          data: {
            userName: user.userName,
            email: user.email,
            token: token,
            userId: user._id,
          },
        });
    }
  } catch (err) {
    console.log(err);
    return res.status(401).send(err);
  }
};
