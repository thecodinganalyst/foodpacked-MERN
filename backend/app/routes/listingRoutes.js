module.exports = (app) => {
  const listings = require("../controllers/listingController.js");

  var router = require("express").Router();

  // Create new listing:
  router.post("/", listings.create);

  // Retrieve all listings
  router.get("/", listings.retrieve);

  // Retrieve by id
  router.get("/:id", listings.retrieveById);

  // Update
  router.put("/:id", listings.update);

  // Delete single listing
  router.delete("/:id", listings.delete);

  // Retrieve by availability
  router.get("/available", listings.retrieveAvailable);

  app.use("/api/listings", router);
};
