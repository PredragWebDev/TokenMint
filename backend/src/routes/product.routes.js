module.exports = app => {
  const productController = require("../controllers/product.controller.js");

  var router = require("express").Router();

  // Create a new Client
  router.post("/", productController.create);
  router.get("/", productController.list);
  router.delete("/", productController.removeAll);
  router.get("/:product_id", productController.get);
  router.post("/update:product_id", productController.update);
  router.delete("/:product_id", productController.remove);

  app.use("/api/product", router);
};

