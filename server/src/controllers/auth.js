const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const saltRounds = 10;

// Create New User
exports.signup = async (req, res) => {
  const { username, password } = req.body;

  // Hash password.
  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(password, salt, async function (err, hash) {
      // Create new user object.
      const user = new User({
        username: username,
        password_hash: hash,
      });

      // Save user to database.
      await user.save();

      res.json({ success: true });
    });
  });
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username: username });
    if (user) {
      // Compare password with hashed password in database
      bcrypt.compare(
        password,
        user.password_hash,
        async function (err, result) {
          if (result) {
            jwt.sign(
              { uid: user.uid },
              process.env.SECRET,
              { algorithm: "HS256" },
              function (err, token) {
                // Return user data
                res.json({
                  token: token,
                });
              }
            );
          } else {
            res.json({
              error: { type: "password", msg: "Password incorrect" },
            });
          }
        }
      );
    } else {
      res.json({ error: { type: "username", msg: "Username not found" } });
    }
  } catch (err) {
    console.log(err);
  }
};
