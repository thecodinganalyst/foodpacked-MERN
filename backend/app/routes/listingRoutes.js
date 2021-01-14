module.exports = (app) => {
  const listings = require("../controllers/listingController.js");

  var router = require("express").Router();

  // Create new listing:
  router.post("/", listings.create);

  // Retrieve all listings
  router.get("/", listings.retrieve);

  // Retrieve by availability: include before ID.
  // otherwise, will take id = available and find by ID "available"
  router.get("/available", listings.retrieveAvailable);

  // Retrieve by id
  router.get("/:id", listings.retrieveById);

  // Update
  router.put("/:id", listings.update);

  // Delete single listing
  router.delete("/:id", listings.delete);

  // npm start loads /listings instead of /
  app.use("/api/listings", router);
};
