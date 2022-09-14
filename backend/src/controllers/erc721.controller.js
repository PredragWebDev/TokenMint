const { pool } = require("../mysql/connector");
const Product = require("../db/product.db");
const ERC721 = require("../db/erc721.db");

exports.get = (req, res) => {
  let id = req.params.token_id
  ERC721.get(id, (err, result, fields) => {
    if (err) throw err;
    var exportToken = {}
    if (result.length) {
      exportToken = {
        name: result[0].name,
        description: result[0].description,
        image: result[0].image,
        external_link: result[0].exturnal_url,
        attributes: []
      }
    }

    res.json(exportToken);
  })
}