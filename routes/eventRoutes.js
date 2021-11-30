import control from '../controllers';
const router = require("express").Router();

router.get("./", control.event.index);
router.get("./:id", control.event.show);
router.post("./", control.event.create);
router.put("./:id", control.event.update);
router.delete("./:id", control.event.destroy);

module.exports = router;

