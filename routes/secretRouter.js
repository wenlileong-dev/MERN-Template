const express = require("express");
const controller = require("../controllers/secretController");
const { authUser } = require("../controllers/authUser");
const router = express.Router();

router.get("/", authUser, controller.secretRoute);

module.exports = router;
