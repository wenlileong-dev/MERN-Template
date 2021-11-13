const express = require("express");
const controller = require("../controllers/userController");
const validator = require("../validation/userValidator");
const { authUser } = require("../controllers/authUser");
const router = express.Router();

router.post("/register", validator.userValidator, controller.userRegister);
router.post("/login", controller.userLogin);
router.post("/logout", controller.userLogout);

router.delete("/deleteUser", authUser, controller.deleteUser);

module.exports = router;
