const env = require("../config")

const HDWalletProvider = require("@truffle/hdwallet-provider");
const web3 = require("web3");
const MNEMONIC = env.MNEMONIC;
const NODE_API_KEY = env.INFURA_KEY || env.ALCHEMY_KEY;
const isInfura = !!env.INFURA_KEY;
const NFT_1155_CONTRACT_ADDRESS = env.NFT_1155_CONTRACT_ADDRESS;
const NFT_721_CONTRACT_ADDRESS = env.NFT_721_CONTRACT_ADDRESS;
const NETWORK = env.NETWORK;
const OWNER_ADDRESS = env.OWNER_ADDRESS

const Product_ABI = require("../abi/Product.json")
const Product_Accessory_ABI = require("../abi/ProductAccessory.json")

const network = 
   	 NETWORK === "mainnet" || NETWORK === "live" ? "mainnet" : "rinkeby";

const provider = new HDWalletProvider(
  {
    mnemonic: {
        phrase: MNEMONIC
      },
    providerOrUrl: isInfura
          ? "https://" + network + ".infura.io/v3/" + NODE_API_KEY
          : "https://eth-" + network + ".alchemyapi.io/v2/" + NODE_API_KEY
  }
);

const web3Instance = new web3(provider);

exports.getTokenInfo = (token_id, token_type) => {
	var nftContract = undefined
	if (token_type === 0) {
		nftContract = new web3Instance.eth.Contract(
		  Product_ABI.abi,
		  NFT_721_CONTRACT_ADDRESS,
		  { gasLimit: "1000000" }
		);
	} else {
		nftContract = new web3Instance.eth.Contract(
		  Product_Accessory_ABI,
		  NFT_1155_CONTRACT_ADDRESS,
		  { gasLimit: "1000000" }
		);
	}

  	provider.engine.stop()
  	// Creatures issued directly to the owner.
  	return nftContract.methods.getInfo(token_id).call({from: OWNER_ADDRESS})
}

exports.getHistory = (token_type) => {
  	var nftContract = undefined
	if (token_type === 0) {
		nftContract = new web3Instance.eth.Contract(
		  Product_ABI.abi,
		  NFT_721_CONTRACT_ADDRESS,
		  { gasLimit: "1000000" }
		);
	} else {
		nftContract = new web3Instance.eth.Contract(
		  Product_Accessory_ABI,
		  NFT_1155_CONTRACT_ADDRESS,
		  { gasLimit: "1000000" }
		);
	}

	const event_name = token_type == 0 ? "Transfer" : "TransferSingle"
	provider.engine.stop()
  	return nftContract.getPastEvents(event_name, {fromBlock: 0, toBlock: 'latest'})
}

exports.getTransaction = (tx) => web3Instance.eth.getTransaction(tx)

exports.getBlock = (bNumber) => {
	console.log(bNumber)
	return web3Instance.eth.getBlock(bNumber)
}