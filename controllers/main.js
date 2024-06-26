const jwt = require("jsonwebtoken");
const { BadRequest } = require("../errors/index");

const login = async (req, res) => {
  const { username, password } = req.body;
  // console.log(username, password);

  if (!username || !password) {
    throw new BadRequest("Please provide valid Email and password!");
  }

  const id = new Date().getDate();

  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.status(200).json({ msg: "user Created", token });
};

const dashBoard = async (req, res) => {
  console.log(req.user);

  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: `Hello , ${req.user.username}`,
    secret: `Here is your authorised data , your lucky Number ${luckyNumber}`,
  });
};

module.exports = {
  login,
  dashBoard,
};
