import control from '../controllers';
const router = require("express").Router();

router.post("./register", control.auth.register)
router.post("./login", control.auth.login);

module.exports = router;