const express = require("express");
const UsersController = require("../../controllers/usersController");
const auth = require("../../middleware/auth");

const router = express.Router();

router.get("/:id", auth, UsersController.getById);
router.post("/", UsersController.create);
router.patch("/:id", auth, UsersController.update);
router.delete("/:id",  auth,UsersController.delete);

module.exports = router;
