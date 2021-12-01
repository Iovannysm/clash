const control = require("../controllers");
const router = require("express").Router();

router.get("/", control.games.index);
router.get("/:id", control.games.show);
router.post("/", control.games.create);
router.put("/:id", control.games.update);
router.delete("/:id", control.games.destroy);

module.exports = router;