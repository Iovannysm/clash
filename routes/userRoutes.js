const control = require("../controllers");
const router = require("express").Router();


const authRequired =  require("../middleware/authRequired");

router.get("/", authRequired, control.user.show);

module.exports = router;