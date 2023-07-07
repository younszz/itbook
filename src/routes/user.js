const express = require("express");
const userController = require("../controller/user");

const router = express.Router();

router.post("/api/join", userController.postJoin);
router.post("/api/login", userController.postLogin);

module.exports = router;
