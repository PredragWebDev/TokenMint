const { pool } = require("../mysql/connector");
const User = require("../db/user.db");

exports.create = (req, res) => {
  let name = req.body.name
  let address = req.body.address
  let nonce = req.body.nonce

  User.create(name, address, nonce, "", (err, result) => {
    if (err) throw err;
    res.send(JSON.stringify({
      result
    })); 
  })
}

exports.list = (req, res) => {
  User.list((err, result, fields) => {
    if (err) throw err;
    var string = JSON.stringify(result);
    res.send(string);
  })
}

exports.removeAll = (req, res) => {
  User.removeAll((err, result, fields) => {
    if (err) throw err;
    var string = JSON.stringify(result);
    res.send(string);
  })
}

exports.get = (req, res) => {
  let id = req.params.userId
  User.getById(id, (err, result, fields) => {
    if (err) throw err;
    var string = JSON.stringify(result);
    res.send(string);
  })
}

exports.find = (req, res) => {
  let address = req.query.publicAddress
  User.getByAddress(address, (err, result, fields) => {
    if (err) throw err;
    var string = JSON.stringify(result);
    res.send(string);
  })
}

exports.update = (req, res) => {
  let id = req.params.user_id
  let name = req.body.name
  let address = req.body.address
  let nonce = req.body.nonce
}

exports.remove = (req, res) => {
  let id = req.params.user_id
  User.remove(id, (err, result, fields) => {
    if (err) throw err;
    var string = JSON.stringify(result);
    res.send(string);
  })
}

exports.verify = (req, res) => {
  let id = req.body.id
  let name = req.body.name
  let address = req.body.address
  let nonce = req.body.nonce

  User.verify({ id, name, address, nonce }, (err, result, fields) => {
    if (err) throw err
    console.log(result)
    if (result.length > 0)
      res.send(JSON.stringify(result[0]))
    else 
      res.send(JSON.stringify({}))
  })
}