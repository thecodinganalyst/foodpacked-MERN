module.exports = (app) => {
  const listings = require("../controllers/listingController.js");

  const router = require("express").Router();

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

  // Delete all listings
  router.delete("/", listings.deleteAll);

  // npm start loads /listings instead of /
  app.use("/api/listings", router);
};
