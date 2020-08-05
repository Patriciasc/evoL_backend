const router = require("express").Router();

const { authUser } = require("../utils/index");

const {
  addRequest,
  getMyRequests,
  getRequestsByItemId,
} = require("../controllers/requests.controller");

router.post("/", addRequest);
router.get("/me", getMyRequests);
router.get("/:id", getRequestsByItemId);

module.exports = router;
