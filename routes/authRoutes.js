const {auth} = require("../controllers");
const router = require("express").Router();

router.post("/register", auth.register);
router.post("/login", auth.login);
router.get("/logout", auth.logout);
router.get("/register", function (req, res){
  return res.render("./views/auth/register");
});
router.get("/login", function (req, res){
  return res.render("./views/auth/login");
});;

module.exports = router;