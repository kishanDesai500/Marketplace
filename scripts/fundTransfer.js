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

        // add wallets of user
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
            .transferToken(process.env.govAddress, "300000000000000000000")
            .send({
                from: process.env.PUBLIC_KEY,
                gas: 8000000,
            });
        console.log(3);

        // const Owner2 = await contract_Token.methods
        //     .transferToken(process.env.memberPub, 50000000)
        //     .send({
        //         from: process.env.PUBLIC_KEY,
        //         gas: 8000000,
        //     });

        const Owner2 = await contract_Token.methods
            .mint("500000000000000000000")
            .send({
                from: process.env.PUBLIC_KEY,
                gas: 8000000,
            });
        console.log(4);

        // for set address of owner to gov
        const setAddressToken = await contract_governance.methods
            .setAddressToken(process.env.tokenAddress)
            .send({ from: process.env.PUBLIC_KEY, gas: 8000000 });
        console.log(5);

        const Balance = await contract_governance.methods
            .getblance(process.env.govAddress)
            .call();

        console.log("GOV Balance:", Balance);
        console.log("this is contrect add" + process.env.govAddress);
        console.log(6);

        const memberBalance = await contract_governance.methods
            .getblance(process.env.memberPub)
            .call();

        console.log("Older Member Bal: ", memberBalance);
        const memberBal = await web3.eth.getBalance(process.env.memberPub);
        console.log("memberBal", memberBal);

        // approve token of member by gov
        approve = await contract_governance.methods
            .approveToken(process.env.govAddress, "5000000000000000000")
            .send({
                from: process.env.memberPub,
                gas: 8000000,
            });
        console.log(7);
        console.log("Approved Token");

        // test transfer token
        // transferforCheck = await contract_governance.methods
        //     .transferFromContrect(process.env.memberPub, process.env.userPub, 10)
        //     .send({
        //         from: process.env.userPub,
        //         gas: 8000000,
        //     });
        // console.log(8);

        usergetToken = await contract_governance.methods
            .getToken()
            .send({ from: process.env.memberPub, value: 3, gas: 500000 });
        console.log("Token Received");
        console.log(9);

        // blacklist user
        blockuser = await contract_governance.methods
            .blackList("0xa057ba6cef9877e638643afedf03e70c033c42a0")
            .send({ from: process.env.PUBLIC_KEY, gas: 500000 });
        console.log("blockuser", blockuser);
        console.log(10);

        const userBalance = await contract_governance.methods
            .getblance(process.env.memberPub)
            .call();
        console.log("userBalance", userBalance);
        const newMemberBal = await web3.eth.getBalance(process.env.memberPub);
        console.log("newMemberBal", newMemberBal);

        // const sellToken = await contract_governance.methods
        //     . sellToken(10000000)
        //     .send({
        //         from: process.env.memberPub,
        //         to: process.env.govAddress,
        //         gas:900000
        //     })
        //     console.log("sellToken",sellToken);
    } catch (err) {
        console.log(err);
        ``;
    }
};

init();