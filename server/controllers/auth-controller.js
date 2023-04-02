const User = require('../models/user');
const { hashPassword, comparePassword } = require('../utils/crypto');

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // validation
    if (!name) return res.status(400).send("Name is required");
    if (!password || password.length < 6) {
      return res
        .status(400)
        .send("Password is required and should be min 6 characters long");
    }
    let userExist = await User.findOne({ email }).exec();
    if (userExist) return res.status(400).send("Email is taken");

    // hash password
    const hashedPassword = await hashPassword(password);

    // register
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });
    await user.save();
    return res.json({ ok: true });
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error. Try again.");
  }
};

const login = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name) return res.status(400).send("Name is required");
  if (!password) return res.status(400).send("Password is required");

};

module.exports = {
  register,
  login
}