// contracts
const PolymathRegistry = artifacts.require("./PolymathRegistry.sol");
// dependencies
// const Web3 = require("web3");

module.exports = async (deployer, network, accounts) => {
  await deployer.deploy(PolymathRegistry);
  const instance = await PolymathRegistry.deployed();
};
