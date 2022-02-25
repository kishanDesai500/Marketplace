const { ethers } = require("hardhat");

async function main() {
    const Arkius = await ethers.getContractFactory("Arkius");
    const governance = await ethers.getContractFactory("governance");

    // Start deployment, returning a promise that resolves to a contract object
    const arkiusInst = await Arkius.deploy("50000000000000000000000");
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

// Arkius Contract deployed to address: 0x8b06A96585062a04d5AD925fbEC274Da9B431A82
// governance Contract deployed to address 0x3dfD7549d9Cd566F71Fe019C65903E5e2aD62C30