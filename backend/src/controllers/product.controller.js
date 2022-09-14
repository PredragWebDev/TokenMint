require('dotenv').config()

const { pool } = require("../mysql/connector");
const Product = require("../db/product.db")
const ERC721 = require("../db/erc721.db")
const ERC1155 = require("../db/erc1155.db")
const { mintERC1155, mintERC721 } = require("../actions/mint")

exports.create = (req, res) => {
  let user_id = req.body.userId
  
  let description = req.body.description
  let image = req.body.image
  let name = req.body.name
  let user_wallet = req.body.userWallet
  let status = "processing"
  let token_type = req.body.tokenType

  console.log(token_type)

  Product.create(user_id, 0, token_type, status, (pe, pr) => {
	  if (pe) throw pe;
	  let exturnal_url = `${process.env.APP_DOMAIN}product/${pr.insertId}`;
	  if (token_type == 0) {
	  	ERC721.create(name, description, image, exturnal_url, (err, result) => {
			if (err) console.log(err);
			let token_id = result.insertId
			Product.updateId(pr.insertId, token_id, (pe1, pr1) => {
				res.send(
					JSON.stringify({
				      status: status
				    })
				);
			})
			mintERC721(user_wallet, token_id, pr.insertId, name, description, image, exturnal_url)
	  	})
	  } else {
	  	let quantity = req.body.quantity
	  	ERC1155.create(name, description, image, exturnal_url, (err, result) => {
			if (err) console.log(err);
			let token_id = result.insertId
			Product.updateId(pr.insertId, token_id, (pe1, pr1) => {
				res.send(
					JSON.stringify({
				      status: status
				    })
				);
			})
			mintERC1155(user_wallet, token_id, quantity, pr.insertId, name, description, image, exturnal_url)
		})
	  }
  })
}

exports.list = (req, res) => {
	Product.list((err, result, fields) => {
		if (err) res.status(401).send(err);
		console.log(result)
		var string = JSON.stringify(result);
	    res.send(string);
	})
}

exports.removeAll = (req, res) => {
	Product.removeAll((err, result, fields) => {
	    if (err) throw err;
	    var string = JSON.stringify(result);
	    res.send(string);
	})
}

exports.get = (req, res) => {
  let id = req.params.product_id
  Product.getById(id, (err, result, fields) => {
  	if (err) throw err;
  	var exportResult = {}
  	if (result.length)
  		exportResult = result[0]

    var string = JSON.stringify(exportResult);
    res.send(string);
  })
}

exports.update = (req, res) => {
  let id = req.params.product_id
  let user_id = req.body.user_id
  let token_id = req.body.token_id
  let token_type = req.body.token_type
  let status = req.body.status
  
  Product.update(id, user_id, token_id, token_type, statu, (err, results, fields) => {
  	if (err) throw err;
    var string = JSON.stringify(result);
    res.send(string);
  })
}

exports.remove = (req, res) => {
  let id = req.params.product_id
  Product.remove(id, (err, result, fields) => {
  	if (err) throw err;
    var string = JSON.stringify(result);
    res.send(string);
  })
}