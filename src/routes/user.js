const express = require("express");
const userController = require("../controllers/user");
const authController = require("../controllers/auth")
const passport = require("passport");
const router = express.Router();

router.post("/api/join", authController.postJoin);
router.post("/api/login", authController.postLogin);

router.get("/api/user", passport.authenticate('jwt', { session: false}), userController.getUser);

router.post("/api/user/:uid", passport.authenticate('jwt', { session: false }), userController.updateUser);

router.delete("/api/user/:uid", passport.authenticate('jwt', { session: false}), userController.deleteUser);

module.exports = router;
