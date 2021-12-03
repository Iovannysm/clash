const {games} = require("../controllers");
const router = require("express").Router();

router.get("/", games.index);
router.get("/:id", games.show);
router.post("/", games.create);
router.put("/:id", games.update);
router.delete("/:id", games.destroy);

module.exports = router;