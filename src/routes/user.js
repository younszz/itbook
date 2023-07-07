const express = require("express");
const userController = require("../controllers/user");

const router = express.Router();

router.post("/api/join", userController.postJoin);
router.post("/api/login", userController.postLogin);

module.exports = router;
