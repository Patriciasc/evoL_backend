const itemModel = require("../models/items.model");
const { handleError } = require("../utils");

module.exports = {
  createItem,
  getItems,
  getMyItems,
  getItemById,
  deleteItemById,
};

function createItem(req, res) {
  req.body.owner = res.locals.user._id;
  itemModel
    .create(req.body)
    .then((response) => res.json(response))
    .catch((err) => handleError(err, res));
}

function getItems(req, res) {
  var query = {};

  if (req.query.category) {
    query.category = req.query.category;
  }

  query.assignedTo = null;

  itemModel
    .find(query)
    .populate("owner")
    .then((items) => res.json(items))
    .catch((err) => handleError(err, res));
}

function getMyItems(req, res) {
  itemModel
    .find({ owner: res.locals.user._id })
    .then((items) => res.json(items))
    .catch((err) => handleError(err, res));
}

function getItemById(req, res) {
  itemModel
    .find({ _id: req.params.id })
    .populate("owner")
    .then((item) => res.json(item))
    .catch((err) => handleError(err, res));
}

function deleteItemById(req, res) {
  itemModel
    .deleteOne({ _id: req.params.id })
    .then((response) => res.json(response))
    .catch((err) => handleError(err, res));
}
