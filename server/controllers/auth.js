require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { SECRET } = process.env;
const { User } = require("../models/user");

const createToken = (username, id) => {
  let data = {
    username: username,
    id: id,
  };

  return jwt.sign(data, SECRET, { expiresIn: 60 * 60 * 48 });
};

module.exports = {
  register: async (req, res) => {
    try {
      let { username, password } = req.body;
      let foundUser = await User.findOne({ where: { username: username } });

      if (foundUser) {
        res.status(400).send("cannot create user");
      } else {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        let newUser = await User.create({
          username: username,
          hashedPass: hash,
        });
        const token = createToken(
          newUser.dataValues.username,
          newUser.dataValues.id
        );
        console.log("TOKEN", token);
        const exp = Date.now() + 1000 * 60 * 60 * 48;
        res.status(200).send({
          username: newUser.dataValues.username,
          userId: newUser.dataValues.id,
          token,
          exp,
        });
      }
    } catch (error) {
      console.log("error in register")
      console.log(error);
      res.sendStatus(400);
    }
  },
  login: async (req, res) => {
    console.log("login");
    try {
      let { username, password } = req.body;
      let foundUser = await User.findOne({ where: { username: username } });

      if (foundUser) {
        const isAuthenticated = bcrypt.compareSync(
          password,
          foundUser.hashedPass
        );
        if (isAuthenticated) {
          const token = createToken(
            foundUser.dataValues.username,
            foundUser.dataValues.id
          );
          const exp = Date.now() + 1000 * 60 * 60 * 48;

          res.status(200).send({
            username: foundUser.dataValues.username,
            userId: foundUser.dataValues.id,
            token,
            exp,
          });
        } else {
          res.status(400).send('cannot log in')
        }
      } else {
        res.status(400).send('cannot log in')
      }
    } catch (error) {
      console.log("error in login")
      console.log(error);
      res.sendStatus(400);
    }
  }
};
