const express = require("express");
const controller = require("../controllers/userController");
const validator = require("../validation/userValidator");
const router = express.Router();

router.post("/register", validator.userValidator, controller.userRegister);
router.post("/login", controller.userLogin);
router.post("/logout", controller.userLogout);

module.exports = router;
