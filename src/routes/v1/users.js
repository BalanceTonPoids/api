const express = require("express");
const UsersController = require("../../controllers/usersController");

const router = express.Router();

router.get("/", UsersController.get);
router.get("/:id", UsersController.getById);
router.post("/", UsersController.create);
router.patch("/:id", UsersController.update);
router.delete("/:id", UsersController.delete);

module.exports = router;
