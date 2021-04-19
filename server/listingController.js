const express = require("express");
const mongoose = require("mongoose");

const Listing = require(__dirname + "/listingModel.js")(mongoose);

// use Mongoose helper functions for CRUD operations. Returns mongoose Query object.

exports.createNewListing = (req, res) => {
  // validate request
  if (!req.body.shopName) {
    res.status(400).send({ message: "Content is empty!" });
    return;
  }

  // Create Listing
  const listing = new Listing({
    shopName: req.body.shopName,
    itemName: req.body.itemName,
    price: req.body.price,
    available: req.body.available ? req.body.available : false,
  });

  // Save listing
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

exports.retrieveAllListings = (req, res) => {
  console.log("before")
  Listing.find()
    .then((data) => {
      console.log("inside then")
      res.send(data);
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send({
        message: err.message || "Failed to retrieve listings!",
      });
    });
};

exports.retrieveListingById = (req, res) => {
  const id = req.params.id;

  Listing.findById(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Listing not found! (Listing ID: ${id})`,
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error in retrieving listing! (Listing ID: ${id})`,
      });
    });
};

exports.updateListingById = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Empty field detected!" });
  }
  const id = req.params.id;

  Listing.findByIdAndUpdate(id, req.body, {
    useFindAndModify: false,
  })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Listing not found. Cannot update listing! (Listing ID: ${id}).`,
        });
      } else {
        res.send({
          message: `Hello I am the backend! Listing updated successfully! ${data}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error updating listing. (Listing ID: ${id}).`,
      });
    });
};

exports.deleteSingleListing = (req, res) => {
  const id = req.params.id;

  Listing.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Listing with id ${id} not found. Unable to delete!`,
        });
      } else {
        const shopName = data.shopName;
        const itemName = data.itemName;
        res.send({
          message: `Deleted ${itemName} from ${shopName} (Listing ID: ${id})!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Could not delete listing (Listing ID: ${id}).`,
      });
    });
};

// deleteMany deletes according to specified condition
exports.deleteAllListings = (req, res) => {
  Listing.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} listings were deleted.`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured while deleting listings.",
      });
      console.log(err);
    });
};

// find all listings that are available
exports.retrieveAvailable = (req, res) => {
  Listing.find({ available: true })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Unable to retrieve!",
      });
    });
};
