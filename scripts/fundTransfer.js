const Web3 = require("web3");
require("dotenv").config();

const arkiusToken = require("../artifacts/contracts/Arkius.sol/Arkius.json");
const governance = require("../artifacts/contracts/governance.sol/governance.json");

env = process.env;
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.API_URL));

const init = async() => {
    try {
        const id = await web3.eth.net.getId();
        console.log(id);

        const accounts = await web3.eth.accounts.wallet.add(
            process.env.PRIVATE_KEY
        );
        const account2 = await web3.eth.accounts.wallet.add(process.env.member);

        const account3 = await web3.eth.accounts.wallet.add(process.env.user);

        const contract_Token = new web3.eth.Contract(
            arkiusToken.abi,
            process.env.tokenAddress
        );

        console.log(1);

        const contract_governance = new web3.eth.Contract(
            governance.abi,
            process.env.govAddress
        );
        console.log(2);

        // for read owner variable from contract
        const Owner = await contract_Token.methods
            .transferToken(process.env.govAddress, 50000000)
            .send({
                from: process.env.PUBLIC_KEY,
                gas: 8000000,
            });
        console.log(2);

        const Owner2 = await contract_Token.methods
            .transferToken(process.env.memberPub, 50000000)
            .send({
                from: process.env.PUBLIC_KEY,
                gas: 8000000,
            });
        console.log(3);

        const setAddressToken = await contract_governance.methods
            .setAddressToken(process.env.tokenAddress)
            .send({ from: process.env.PUBLIC_KEY, gas: 8000000 });
        console.log(4);

        const Balance = await contract_governance.methods
            .getblance(process.env.govAddress)
            .call();

        console.log(Balance);
        console.log("this is contrect add" + process.env.govAddress);
        console.log(5);

        const memberBalance = await contract_governance.methods
            .getblance(process.env.memberPub)
            .call();

        approve = await contract_governance.methods
            .approveToken(process.env.govAddress, 500000)
            .send({
                from: process.env.memberPub,
                gas: 8000000,
            });

        transferforCheck = await contract_governance.methods
            .transferFromContrect(process.env.memberPub, process.env.userPub, 10)
            .send({
                from: process.env.userPub,
                gas: 8000000,
            });
        usergetToken = await contract_governance.methods
            .getToken()
            .send({ from: process.env.memberPub, value: 3, gas: 500000 });

        blockuser = await contract_governance.methods
            .blackList("0xa057ba6cef9877e638643afedf03e70c033c42a0")
            .send({ from: process.env.PRIVATE_KEY });

        console.log(memberBalance);
        const userBalance = await contract_governance.methods
            .getblance(process.env.memberPub)
            .call();

        //200002820
        console.log(userBalance);
    } catch (err) {
        console.log(err);
        ``;
    }
};

init();