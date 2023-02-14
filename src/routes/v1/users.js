const express = require("express");
const UsersController = require("../../controllers/usersController");
const auth = require("../../middleware/auth");

const router = express.Router();

router.get("/", auth, UsersController.getById);
router.patch("/", auth, UsersController.update);

module.exports = router;
