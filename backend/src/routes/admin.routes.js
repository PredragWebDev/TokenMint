module.exports = app => {
  const adminController = require("../controllers/admin.controller.js");

  var router = require("express").Router();

  // Create a new Me
  router.get("/install", adminController.create);

  app.use("/admin", router);
};