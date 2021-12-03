const { User } = require("../models")

const show = async function(req, res, next) {
  try {
    const foundUser = await User.findById(req.params.id);

    const context = {
      user: foundUser,
    }

    return res.redirect("/user", context);

  } catch (error) {
      console.log(error);
      req.error = error
      return next();
  }
};

module.exports = {
  show,
}