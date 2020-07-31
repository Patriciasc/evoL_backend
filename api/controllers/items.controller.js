const itemModel = require("../models/items.model");
const { handleError } = require("../utils");

module.exports = {
  createItem,
};

function createItem(req, res) {
  console.log("createItem");
  console.log(req.body);

  req.body.owner = res.locals.user._id;
  itemModel
    .create(req.body)
    .then((response) => res.json(response))
    .catch((err) => handleError(err, res));
}
