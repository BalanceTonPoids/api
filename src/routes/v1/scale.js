const express = require("express");
const ScaleController = require("../../controllers/scalesController");

const router = express.Router();

router.get("/:id", ScaleController.getById);
router.post("/:iduser", ScaleController.create);
router.delete("/:id", ScaleController.delete);

module.exports = router;
