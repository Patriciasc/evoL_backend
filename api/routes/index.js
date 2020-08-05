const router = require("express").Router();

const itemRouter = require("./items.router");
const requestRouter = require("./requests.router");
const authRouter = require("./auth.router");
const { authUser } = require("../utils"); // Authenticated Route

router.use("/auth", authRouter);
router.use("/items", itemRouter);
router.use("/requests", authUser, requestRouter);

module.exports = router;
