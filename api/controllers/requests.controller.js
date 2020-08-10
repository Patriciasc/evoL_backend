const requestModel = require("../models/requests.model");
const { handleError } = require("../utils");
const mongoose = require("mongoose");
const itemModel = require("../models/items.model");
ObjectId = require("mongodb").ObjectID;

module.exports = {
  addRequest,
  getMyRequests,
  getRequestsByItemId,
  updateRequest,
  deleteRequestById,
};

function addRequest(req, res) {
  console.log("addRequest");
  req.body.userId = res.locals.user._id;

  requestModel
    .find({ userId: res.locals.user._id, itemId: req.body.itemId })
    .then((request) => {
      if (request.length === 0) {
        requestModel
          .create(req.body)
          .then((response) => res.json(response))
          .catch((err) => handleError(err, res));
      }
    })
    .catch((err) => handleError(err, res));
}

function getRequestByItemAndUserId() {}

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
      res.json(requests);
    })
    .catch((err) => handleError(err, res));
}

function updateRequest(req, res) {
  itemModel
    .findById({ _id: req.body.itemId })
    .then((item) => {
      item.assignedTo = ObjectId(req.params.id);
      item
        .save()
        .then((itemUpdated) => {
          requestModel
            .find({ itemId: req.body.itemId })
            .then((requests) => {
              requests.forEach((request) => {
                request._id.toString() === req.params.id
                  ? (request.state = "Aceptado")
                  : (request.state = "Denegado");
                request
                  .save()
                  .then((requestUpdated) => console.log(requestUpdated))
                  .catch((err) => handleError(err, res));
              });
              res.json(requests);
            })
            .catch((err) => handleError(err, res));
        })
        .catch((err) => handleError(err, res));
    })
    .catch((err) => handleError(err, res));
}

function deleteRequestById(req, res) {
  requestModel
    .deleteOne({ _id: req.params.id })
    .then((response) => res.json(response))
    .catch((err) => handleError(err, res));
}
