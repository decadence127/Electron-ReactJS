const { Router } = require("express");
const router = Router();
const mainController = require("./Controller/MainController");

router.post("/", mainController.start);
router.post("/login", mainController.send);

module.exports = router;
