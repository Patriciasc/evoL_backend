const router = require("express").Router();

const { authUser } = require("../utils/index");
const {
  createItem,
  getItems,
  getMyItems,
  getItemById,
} = require("../controllers/items.controller");

router.post("/", authUser, createItem);
router.get("/", getItems);
router.get("/me", authUser, getMyItems);
router.get("/:id", getItemById);

module.exports = router;
