module.exports = (app) => {
  const listings = require("../controllers/listingController.js");

  var router = require("express").Router();

  // Create new listing:
  router.post("/", listings.create);

  app.use("/api/listings", router);
};
