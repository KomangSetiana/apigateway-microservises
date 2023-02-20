const express = require("express");
const router = express.Router();
const { APP_NAME } = process.env;
const usersHandler = require("./handler/users");
const verifyToken = require("../middleware/verifyToken");
/* GET users listing. */
router.post("/register", usersHandler.register);
router.post("/login", usersHandler.login);
router.put("/:id", verifyToken, usersHandler.update);
router.get("/", verifyToken, usersHandler.getUser);
router.post("/logout", verifyToken, usersHandler.logout);

module.exports = router;
