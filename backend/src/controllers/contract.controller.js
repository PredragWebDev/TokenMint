CONTRACT_URI_METADATA = {
    'product-erc721': {
        'name': 'Product',
        'description': 'Friendly creatures of the sea.',
        'image': 'https://example.com/image.png',
        'external_link': 'https://github.com/ProjectOpenSea/opensea-creatures/'
    },
    'product-erc1155': {
        'name': 'Product Accessories',
        'description': "Fun and useful accessories for your OpenSea creatures.",
        'image': 'https://example.com/image.png',
        'external_link': 'https://github.com/ProjectOpenSea/opensea-erc1155/'
    }
}
CONTRACT_URI_METADATA_AVAILABLE = Object.keys(CONTRACT_URI_METADATA)

exports.get = (req, res) => {
    const contractName = req.params.contract_name
    if (CONTRACT_URI_METADATA_AVAILABLE.includes(contractName))
        res.json(CONTRACT_URI_METADATA[contractName]);
    else
        res.status(404).send('Resource not found')
}