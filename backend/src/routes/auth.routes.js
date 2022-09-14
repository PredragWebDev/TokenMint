module.exports = app => {
  const authController = require("../controllers/auth.controller.js");

  var router = require("express").Router();

  // Create a new Me
  router.post("/", authController.create);

  app.use("/auth", router);
};