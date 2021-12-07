const { Router } = require("express");
const router = Router();
const mainController = require("./Controller/MainController");

router.post("/", mainController.start);
router.post("/query", mainController.send);

module.exports = router;
