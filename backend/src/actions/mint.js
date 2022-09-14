require('dotenv').config()

const HDWalletProvider = require("truffle-hdwallet-provider");
const web3 = require("web3");
const MNEMONIC = process.env.MNEMONIC;
const NODE_API_KEY = process.env.INFURA_KEY || process.env.ALCHEMY_KEY;
const isInfura = !!process.env.INFURA_KEY;
const NFT_721_CONTRACT_ADDRESS = process.env.NFT_721_CONTRACT_ADDRESS;
const NFT_1155_CONTRACT_ADDRESS = process.env.NFT_1155_CONTRACT_ADDRESS;
const Product = require("../db/product.db")
const NETWORK = process.env.NETWORK;
const OWNER_ADDRESS = process.env.OWNER_ADDRESS

const Product_ABI = require("../abi/Product.json")
const Product_Accessory_ABI = require("../abi/ProductAccessory.json")

exports.mintERC721 = (address, token_id, product_id, name, description, image, exturnal_url) => {
	const network =
    NETWORK === "mainnet" || NETWORK === "live" ? "mainnet" : "rinkeby";
	const provider = new HDWalletProvider(
	    MNEMONIC,
	    isInfura
	      ? "https://" + network + ".infura.io/v3/" + NODE_API_KEY
	      : "https://eth-" + network + ".alchemyapi.io/v2/" + NODE_API_KEY
	);
	
	const web3Instance = new web3(provider);

	const nftContract = new web3Instance.eth.Contract(
      Product_ABI.abi,
      NFT_721_CONTRACT_ADDRESS,
      { gasLimit: "1000000" }
    );

    Product.updateStatus(product_id, "minting", (err, res, fields) => {
        console.log(err)
    })

	// nftContract.events.MintToken({}, (error, events) => {
 //    	if (error) {
 //    		console.log(error);
 //    	} else {
 //    		Product.updateStatus(product_id, "success", (err, result, fields) => {
	//     		console.log(result)
	//     	})
 //    	}
 //    })

    // Creatures issued directly to the owner.
    nftContract.methods.mintTo(address, token_id, product_id, name, description, image, exturnal_url).send({from: OWNER_ADDRESS})
    .then((result) => {
    	if (result.status) {
        provider.engine.stop();
    		Product.updateStatus(product_id, "minted", (err, res, fields) => {
	    		console.log(err)
	    	})
    	}
    })
}

exports.mintERC1155 = (address, token_id, quantity, product_id, name, description, image, exturnal_url) => {
	const network =
    NETWORK === "mainnet" || NETWORK === "live" ? "mainnet" : "rinkeby";
	const provider = new HDWalletProvider(
	    MNEMONIC,
	    isInfura
	      ? "https://" + network + ".infura.io/v3/" + NODE_API_KEY
	      : "https://eth-" + network + ".alchemyapi.io/v2/" + NODE_API_KEY
	);
	
	const web3Instance = new web3(provider);

	const nftContract = new web3Instance.eth.Contract(
      Product_Accessory_ABI,
      NFT_1155_CONTRACT_ADDRESS,
      { gasLimit: "1000000" }
    );

    // Creatures issued directly to the owner.
    nftContract.methods.mintTo(address, token_id, quantity, product_id, name, description, image, exturnal_url).send({from: OWNER_ADDRESS})
    	.then((result) => {
        provider.engine.stop()
    		if (result.status) {
	    		Product.updateStatus(product_id, "minted", (err, res, fields) => {
		    		console.log(err)
		    	})
	    	}
    	});
}