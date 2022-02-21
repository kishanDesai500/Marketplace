const { ethers } = require("hardhat");

async function main() {
    const Arkius = await ethers.getContractFactory("Arkius");
    const governance = await ethers.getContractFactory("governance");

    // Start deployment, returning a promise that resolves to a contract object
    const arkiusInst = await Arkius.deploy("200000000000000000000");
    const governanceInst = await governance.deploy();
    console.log("Arkius Contract deployed to address:", arkiusInst.address);

    console.log(
        "governance Contract deployed to address",
        governanceInst.address
    );
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

// Arkius Contract deployed to address: 0x457f9dF82B0D3f8A6dc7255c1875904e18CC0245
// governance Contract deployed to address 0x84A9C292ACd7F8EA000417D5c9Bea3BE569B02a8