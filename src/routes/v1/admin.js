const express = require("express");
const UsersController = require("../../controllers/usersController");
const auth = require("../../middleware/auth");

const router = express.Router();

// user
router.get("/countUser", auth, UsersController.isAdmin,UsersController.countUsers)
    .get("/getUser", auth, UsersController.isAdmin, UsersController.get)
    .get("/getUser/:id", auth, UsersController.isAdmin, UsersController.getById)
    .post("/createUser", auth, UsersController.isAdmin, UsersController.create)
    .delete("/deleteUser/:id", auth, UsersController.isAdmin, UsersController.delete);

// scale data

module.exports = router;
