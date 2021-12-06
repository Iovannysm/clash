const { User } = require("../models");
const bcrypt = require("bcryptjs");
const express = require("express");
const router= express.Router();


// get register
router.get("/register", function (req, res, next) {
  return res.render("auth/register");
});

// Register
router.post("/register", async function(req, res) {
  try {
    const userExist = await User.exists({ email: req.body.email });

    if(userExist) return res.redirect("/login");


    const salt = await bcrypt.genSalt(15);
    const hash = await bcrypt.hash(req.body.password, salt);
    await User.create({ ...req.body, password: hash });

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
});

//get login
router.get("/login", function (req, res, next) {
  return res.render("auth/login");
});

// Login
router.post( "/login", async function (req, res) {
  try {
    const foundUser = await User.findOne({ email:req.body.email }).select("+password");
      
    if(!foundUser) {
      return res.redirect("/register");
    }

    const isMatch = await bcrypt.compare(req.body.password, foundUser.password);

    if(!isMatch){
      return res.send("Password or Email invalid");
    }

    req.session.currentUser = {
      id: foundUser._id,
      username: foundUser.username,
    }
      
    return res.redirect("/user");
        
  } catch(error) {
    console.log(error);
    req.error = error;
    return next();
  }
});


router.get("/logout", async function (req, res, next) {
  try {
    await req.session.destroy();
    return res.redirect("/login");
  } catch (error) {
    console.log(error);
    req.error = error;
    return next();
  }
});

module.exports = router;