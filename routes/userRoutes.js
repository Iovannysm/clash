import control from '../controllers';
const router = require("express").Router();


import authRequired from "../middleware/authRequired";

router.get("/", authRequired, control.user.show);

module.exports = router;