const mongoose = require("mongoose");
const Listing = require("../models/listingModel.js")(mongoose);

// use Mongoose helper functions for CRUD operations. Returns mongoose Query object.

// Create & save listing
exports.create = (req, res) => {
  // validate request
  if (!req.body.shopName) {
    res.status(400).send({ message: "Content is empty!" });
    return;
  }

  // Create Listing
  // new Listing to compile new model
  const listing = new Listing({
    shopName: req.body.shopName,
    itemName: req.body.itemName,
    price: req.body.price,
    available: req.body.available ? req.body.available : false,
  });

  // Save tutorial
  listing
    .save(listing)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: err.message || "Failed to create listing!" });
    });
};

// Retrieve all listings

// Find a single listing using id (shopname, etc)

// Update listing by ID in request

// Delete listing
