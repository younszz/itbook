const express = require("express");
const userController = require("../controllers/user");
const passport = require("passport");
const router = express.Router();

router.post("/api/join", userController.postJoin);
router.post("/api/login", userController.postLogin);

// 사용자 정보 조회
router.get("/api/user", passport.authenticate('jwt', { session: false}), userController.getUser);
// 사용자 정보 수정
router.post("/api/user", passport.authenticate('jwt', { session: false }), userController.updateUser);
// 사용자 정보 삭제
router.delete("/api/user/:uid", passport.authenticate('jwt', { session: false}), userController.deleteUser);

module.exports = router;
