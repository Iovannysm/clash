const control = require("../controllers");
const router = require("express").Router();

router.post("/register", control.auth.register)
router.post("/login", control.auth.login);
router.get("/logout", control.auth.logout);

module.exports = router;