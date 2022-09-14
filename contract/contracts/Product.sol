// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./ERC721Tradable.sol";

/**
 * @title Creature
 * Creature - a contract for my non-fungible creatures.
 */
contract Product is ERC721Tradable {

    struct ProductInfo {
        string name;
        string description;
        string exturnal_url;
        string image;
    }
    
    mapping (uint256 => ProductInfo) products;
	
	event MintToken(uint256 token_id, uint256 product_id);
    
    constructor(address _proxyRegistryAddress)
        ERC721Tradable("Product", "PRD", _proxyRegistryAddress)
    {}

    function baseTokenURI() override public pure returns (string memory) {
        return "https://api.tokenmint.cc/api/erc721/";
    }

    function contractURI() public pure returns (string memory) {
        return "https://api.tokenmint.cc/api/contract/product-erc721";
    }

    function mintTo(
        address _to, 
        uint256 token_id, 
        uint256 product_id, 
        string memory name, 
        string memory description, 
        string memory image,
        string memory exturnal_url
    ) public onlyOwner {
    	mintTo(_to, token_id);
        products[token_id] = ProductInfo({name:name, description:description, image:image, exturnal_url:exturnal_url});
    	emit MintToken(token_id, product_id);
    }

    function getInfo(uint256 token_id) public view returns (string memory, string memory, string memory, string memory)  {
        ProductInfo memory product = products[token_id];
        return (product.name, product.description, product.exturnal_url, product.image);
    }    
}
