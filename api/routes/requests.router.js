const router = require("express").Router();

const { authUser } = require("../utils/index");

const {
  addRequest,
  getMyRequests,
  getRequestsByItemId,
  updateRequest,
  deleteRequestById,
} = require("../controllers/requests.controller");

router.post("/", addRequest);
router.get("/me", getMyRequests);
router.get("/:id", getRequestsByItemId);
router.put("/:id", updateRequest);
router.delete("/:id", deleteRequestById);

module.exports = router;
