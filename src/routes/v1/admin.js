const express = require("express");
const UsersController = require("../../controllers/usersController");

const router = express.Router();

router.get("/count", UsersController.countUsers);

module.exports = router;
