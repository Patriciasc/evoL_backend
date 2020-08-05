const requestModel = require("../models/requests.model");
const { handleError } = require("../utils");

module.exports = {
  addRequest,
  getMyRequests,
  getRequestsByItemId,
};

function addRequest(req, res) {
  req.body.userId = res.locals.user._id;

  requestModel
    .create(req.body)
    .then((response) => res.json(response))
    .catch((err) => handleError(err, res));
}

function getMyRequests(req, res) {
  requestModel
    .find({ userId: res.locals.user._id })
    .populate("itemId userId")
    .then((requests) => {
      res.json(requests);
    })
    .catch((err) => handleError(err, res));
}

function getRequestsByItemId(req, res) {
  requestModel
    .find({ itemId: req.params.id })
    .populate("userId")
    .then((requests) => {
      console.log(requests);
      res.json(requests);
    })
    .catch((err) => handleError(err, res));
}
