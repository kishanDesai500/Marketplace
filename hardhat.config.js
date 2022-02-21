/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require("dotenv").config();
require("@nomiclabs/hardhat-ethers");
const { API_URL, PRIVATE_KEY } = process.env;
module.exports = {
    solidity: {
        compilers: [{
                version: "0.5.16",
            },
            {
                version: "0.6.2",
            },
            {
                version: "0.6.4",
            },
            {
                version: "0.7.0",
            },
            {
                version: "0.8.0",
            },
            {
                version: "0.8.7",
            },
        ],
    },
    defaultNetwork: "fuji",
    networks: {
        hardhat: {},
        fuji: {
            url: API_URL,
            accounts: [`0x${PRIVATE_KEY}`],
        },
    },
};