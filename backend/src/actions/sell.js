const opensea = require("opensea-js");
const { WyvernSchemaName } = require("opensea-js/lib/types")
const OpenSeaPort = opensea.OpenSeaPort;

const ERC721 = require("../db/erc721.db")
const ERC1155 = require("../db/erc1155.db")

const Network = opensea.Network;
const MnemonicWalletSubprovider = require("@0x/subproviders")
  .MnemonicWalletSubprovider;
const RPCSubprovider = require("web3-provider-engine/subproviders/rpc");
const Web3ProviderEngine = require("web3-provider-engine");

const Product = require("../db/product.db")

const MNEMONIC = process.env.MNEMONIC;
const NODE_API_KEY = process.env.INFURA_KEY || process.env.ALCHEMY_KEY;
const isInfura = !!process.env.INFURA_KEY;
const NFT_721_CONTRACT_ADDRESS = process.env.NFT_721_CONTRACT_ADDRESS;
const NFT_1155_CONTRACT_ADDRESS = process.env.NFT_1155_CONTRACT_ADDRESS;
const NETWORK = process.env.NETWORK;
const API_KEY = process.env.API_KEY || ""; // API key is optional but useful if you're doing a high volume of requests.

const BASE_DERIVATION_PATH = `44'/60'/0'/0`;

const mnemonicWalletSubprovider = new MnemonicWalletSubprovider({
  mnemonic: MNEMONIC,
  baseDerivationPath: BASE_DERIVATION_PATH,
});
const network =
  NETWORK === "mainnet" || NETWORK === "live" ? "mainnet" : "rinkeby";
const infuraRpcSubprovider = new RPCSubprovider({
  rpcUrl: isInfura
    ? "https://" + network + ".infura.io/v3/" + NODE_API_KEY
    : "https://eth-" + network + ".alchemyapi.io/v2/" + NODE_API_KEY,
});

const providerEngine = new Web3ProviderEngine();
providerEngine.addProvider(mnemonicWalletSubprovider);
providerEngine.addProvider(infuraRpcSubprovider);
providerEngine.start();

const seaport = new OpenSeaPort(
  providerEngine,
  {
    networkName:
      NETWORK === "mainnet" || NETWORK === "live"
        ? Network.Main
        : Network.Rinkeby,
    apiKey: API_KEY,
  },
  (arg) => console.log(arg)
);

exports.sell = async (product_id, token_id, address, token_type, quantity) => {
  // Example: simple fixed-price sale of an item owned by a user.
  console.log("Auctioning an item for a fixed price...");
  console.log(quantity)
  console.log(token_type)
  let token_address = token_type == 0 ? NFT_721_CONTRACT_ADDRESS : NFT_1155_CONTRACT_ADDRESS
  var fixedPriceSellOrder = undefined
  if (token_type == 0) {
    fixedPriceSellOrder = await seaport.createSellOrder({
      asset: {
        tokenId: token_id,
        tokenAddress: token_address
      },
      startAmount: 0.05,
      expirationTime: 0,
      accountAddress: address,
    });
  } else {

    fixedPriceSellOrder = await seaport.createSellOrder({
      asset: {
        tokenId: token_id,
        tokenAddress: token_address,
        schemaName: WyvernSchemaName.ERC1155
      },
      startAmount: 0.05,
      expirationTime: 0,
      accountAddress: address,
      quantity: parseInt(quantity)
    });
  }

  Product.updateStatus(product_id, "deployed", (err, res, fields) => {
    console.log(err)
  })
  console.log(
    `Successfully created a fixed-price sell order! ${fixedPriceSellOrder.asset.openseaLink}\n`
  );

}