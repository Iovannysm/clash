import { User } from '../models';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Register
const register = async function(req, res) {
  try {
    const foundUser = await User.findOne({ email: req.body.email });

    if(foundUser)
      return res 
        .status(400)
        .json({
          status: 400,
          message: "Email address has already been registered. Please try again",
        });

    const salt = await bcrypt.genSalt(15);
    const hash = await bcrypt.hash(req.body.password, salt);
    const createdUser = await User.create({ ...req.body, password: hash });

    return res
      .status(201)
      .json({
        status: 201,
        message: "Success",
        createdUser
      });

  } catch(error) {
    console.log(error);
    return res
      .status(500)
      .json({
        status: 500,
        message: "Something went wrong. Please try again",
      });

  }
};


// Login
const login = async function (req, res) {
  try {
    const foundUser = await User.findOne({ email:req.body.email }).select(
      "+password"
    );
    
    if(!foundUser) {
      return res 
      .status(400)
      .json({
        status: 400,
        message: "Username or password is incorrect",
      });
    }

    const isMatch = await bcrypt.compare(req.body.password, foundUser.password);

    if(isMatch){

      const signedJwt = await jwt.sign(
        {
          _id: foundUser._id
        },
        process.env.SECRET_KEY,
        {
          expiresIn: "1d",
        }
      );

      return res
        .status(200)
        .json({
          status: 200,
          message: "Success",
          token: signedJwt,
      });

    } else {
      return res
        .status(400)
        .json({
          status: 400,
          message: "Username or password is incorrect",
      });
    }

  } catch(error) {
    return res 
      .status(500)
      .json({
        status: 500,
        message: "Something went wrong. Please try again",
      });
  }
};

module.exports = {
  register,
  login,
}