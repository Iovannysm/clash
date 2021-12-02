const { User } = require("../models");
const bcrypt = require("bcryptjs");


// Register
const register = async function(req, res) {
  try {
    const userExist = await User.exists({ email: req.body.email });

    if(userExist) return res.redirect("/login");


    const salt = await bcrypt.genSalt(15);
    const hash = await bcrypt.hash(req.body.password, salt);
    const createdUser = await User.create({ ...req.body, password: hash });

    const foundUser = await User.findOne({ email: req.body.email });

    req.session.currentUser = {
      id: foundUser._id,
      username: foundUser.username,
    }
        
    return res.redirect("/events")
      
  } catch(error) {
    console.log(error);
    req.error = error
    return next();
  }
};


// Login
const login = async function (req, res) {
  try {
    const foundUser = await User.findOne({ email:req.body.email });
      
    if(!foundUser) {
      return res.redirect("/register");
    }

    const isMatch = await bcrypt.compare(req.body.password, foundUser.password);

    if(!isMatch){
      return res.redirect("/login");
    }

    req.session.currentUser = {
      id: foundUser._id,
      username: foundUser.username,
    }
      
    return res.redirect("/events");
        
  } catch(error) {
    console.log(error);
    req.error = error;
    return next();
  }
};


const logout = async function (req, res, next) {
  try {
    await req.session.destroy();
    return res.redirect("/login");
  } catch (error) {
    console.log(error);
    req.error = error;
    return next();
  }
};

module.exports = {
  register,
  login,
  logout,
}