const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { hashPassword, comparePassword } = require('../utils/crypto');

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // validation
    if (!name) return res.status(400).send('Name is required');
    if (!password || password.length < 6) {
      return res
        .status(400)
        .send('Password is required and should be min 6 characters long');
    }
    let userExist = await User.findOne({ email }).exec();
    if (userExist) return res.status(400).send('Email is taken');

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
  try {
    const { email, password } = req.body;
    
    // check if our db has user with that email
    const user = await User.findOne({ email }).exec();
    if (!user) return res.status(400).send('No user found');
    
    // check password
    const match = await comparePassword(password, user.password);
    if (!match) return res.status(401).send('Invalid credentials');
    
    // create signed jwt
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });
    
    // return user and token to client, exclude hashed password
    user.password = undefined;
    
    // send token in cookie
    res.cookie('token', token, {
      httpOnly: true,
      // secure: true, // only works on https
    });
    
    res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(400).send('Error. Try again.');
  }
};

module.exports = {
  register,
  login
}