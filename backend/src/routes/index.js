module.exports = app => {
  require("./admin.routes")(app)
  require("./erc721.routes")(app)
  require("./erc1155.routes")(app)
  require("./user.routes")(app)
  require("./product.routes")(app)
  require("./auth.routes")(app)
  require("./opensea.routes")(app)
  require("./contract.routes")(app)
};