module.exports = app => {
  const openseaController = require("../controllers/opensea.controller.js");

  var router = require("express").Router();

  // Create a new Client
  router.get("/:product_id", openseaController.view);
  router.post("/:product_id", openseaController.publish);

  app.use("/api/opensea", router);
};