const express = require("express");
const UsersController = require("../../controllers/usersController");
const auth = require("../../middleware/auth");

const router = express.Router();

router.get("/count",  UsersController.countUsers);
router.get("/users",  auth, UsersController.get);

module.exports = router;
