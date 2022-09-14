const { recoverPersonalSignature } = require('eth-sig-util');
const { bufferToHex } = require('ethereumjs-util');
const jwt = require('jsonwebtoken');
const User = require("../db/user.db");
const { config } = require('../config');

exports.create = (req, res, next) => {
	const { signature, publicAddress } = req.body;
	if (!signature || !publicAddress)
		return res
			.status(400)
			.send({ error: 'Request should have signature and publicAddress' });
	User.getByAddress(publicAddress, (err, result, fields) => {
	    if (err) throw err;
	    if (result.length > 0) {
	    	var user = result[0]
			const msg = `I am signing my one-time nonce: ${user.nonce}`;
			// We now are in possession of msg, publicAddress and signature. We
			// will use a helper from eth-sig-util to extract the address from the signature
			const msgBufferHex = bufferToHex(Buffer.from(msg, 'utf8'));
			const address = recoverPersonalSignature({
				data: msgBufferHex,
				sig: signature,
			});

			// The signature verification is successful if the address found with
			// sigUtil.recoverPersonalSignature matches the initial publicAddress
			if (address.toLowerCase() === publicAddress.toLowerCase()) {
				user.nonce = Math.floor(Math.random() * 10000);
				var token = jwt.sign(
					{
						payload: {
							id: user.id,
							publicAddress,
						},
					},
					config.secret,
					{
						algorithm: config.algorithms[0],
					}
				)
				user.accessToken = token
				User.update(user, (error, result, field) => {
					res.send({ ...user, token })
				})
			} else {
				res.status(401).send({
					error: 'Signature verification failed',
				});
			}
	    }
	})
};
