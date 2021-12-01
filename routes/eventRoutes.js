const control = require("../controllers");
const router = require("express").Router();

router.get("/", control.events.index);
router.get("/:id", control.events.show);
router.post("/", control.events.create);
router.put("/:id", control.events.update);
router.delete("/:id", control.events.destroy);

module.exports = router;

