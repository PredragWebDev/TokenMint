const values = require('./valuesCommon.js');

// A function in case we need to change this relationship
const tokenIndexToId = a => a;

// Configure the nfts

const setupAccessory = async (
  accessories,
  owner
) => {
  for (let i = 0; i < values.NUM_ACCESSORIES; i++) {
    const id = tokenIndexToId(i);
    await accessories.create(owner, id, values.MINT_INITIAL_SUPPLY, "", "0x0");
  }
};

module.exports = {
  setupAccessory
};
