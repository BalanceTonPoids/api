const express = require("express");
const ScaleController = require("../../controllers/scalesController");
const auth = require("../../middleware/auth");

const router = express.Router();

router.get("/:id",  auth, ScaleController.getById);
router.post("/:iduser", auth, ScaleController.create);
router.delete("/:id",  auth, ScaleController.delete);

module.exports = router;
