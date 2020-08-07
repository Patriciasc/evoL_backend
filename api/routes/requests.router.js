const router = require("express").Router();

const { authUser } = require("../utils/index");

const {
  addRequest,
  getMyRequests,
  getRequestsByItemId,
  updateRequest,
} = require("../controllers/requests.controller");

router.post("/", addRequest);
router.get("/me", getMyRequests);
router.get("/:id", getRequestsByItemId);
router.put("/:id", updateRequest);

module.exports = router;
