const router = require("express").Router();
const { authUser } = require("../utils/index");

const { createItem } = require("../controllers/items.controller");

router.post("/", authUser, createItem);
module.exports = router;
