const express = require("express");

const router = express.Router();

const { login, dashBoard } = require("../controllers/main");

const authMiddelware = require("../middleware/auth");

router.route("/dashboard").get(authMiddelware, dashBoard);

router.route("/login").post(login);

module.exports = router;
