const {user} = require("../controllers");
const router = require("express").Router();


const authRequired =  require("../middleware/authRequired");

router.get("/", authRequired, user.show);

module.exports = router;