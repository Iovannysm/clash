const {events} = require("../controllers");
const router = require("express").Router();

router.get("/", events.index);
router.get("/:id", events.show);
router.post("/", events.create);
router.put("/:id", events.update);
router.delete("/:id", events.destroy);

module.exports = router;

