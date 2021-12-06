const express = require("express");
const router = express.Router();
const { User } = require("../models")

router.use(require("../middleware/authRequired"));

router.get("/", function(req, res, next) {
  res.redirect(`/user/${req.session.currentUser.id}`)
});


// Show user
router.get("/:id", async function(req, res, next) {
  try {
    const foundUser = await User.findById(req.params.id);

    const context = {
      user: foundUser,
    }

    return res.redirect("/user/userInfo", context);

  } catch (error) {
      console.log(error);
      req.error = error
      return next();
  }
});

module.exports = router