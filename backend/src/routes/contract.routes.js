module.exports = app => {
  const contractController = require("../controllers/contract.controller.js");

  var router = require("express").Router();

  // Create a new Client
  router.get("/:contract_name", contractController.get);

  app.use("/api/contract", router);
};