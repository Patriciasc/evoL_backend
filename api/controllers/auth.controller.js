const UserModel = require("../models/users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function signup(req, res) {
  const hashedPassword = bcrypt.hashSync(req.body.password, 10);
  UserModel.create({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  })
    .then((user) => {
      const userData = { name: user.name, email: user.email };
      const token = jwt.sign(userData, process.env.SECRET, {
        expiresIn: "180m",
      });
      res.json({ token, ...userData });
    })
    .catch((error) => res.status(403).json({ error: error.errmsg }));
}

function login(req, res) {
  UserModel.findOne({ email: req.body.email }).then((user) => {
    if (!user) {
      res.json({ error: "E-mail incorrecto." });
    } else {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        const userData = { name: user.name, email: user.email };
        const token = jwt.sign(userData, process.env.SECRET, {
          expiresIn: "180m",
        });
        res.json({ token, ...userData });
      } else {
        res.json({ error: "Contraseña incorrecta" });
      }
    }
  });
}

module.exports = { signup, login };
