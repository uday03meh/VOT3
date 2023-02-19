require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config()
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.7",
  networks: {
    hardhat: {
      chainId:31337,
    },
    goerli:{
      url:process.env.GOERLI_URL,
      accounts:[process.env.PRIVATE_KEY]
    }
  },
  paths: {
    artifacts:"./frontend/src/artifacts",
  }
};
