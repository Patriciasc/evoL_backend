const itemModel = require("../models/items.model");
const { handleError } = require("../utils");

module.exports = {
  createItem,
  getItems,
  getMyItems,
  getItemById,
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

  itemModel
    .find(query)
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
    .then((item) => res.json(item))
    .catch((err) => handleError(err, res));
}
