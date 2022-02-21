let address;
let chatApp;
let contract;
let privateKey;
let maxGas;
let displayUserName;
let env;

displayUserName = localStorage.getItem("displayUserName");

const setName = async() => {
    $("#displayName").text(displayUserName);
};

console.log(window.location.href);
if (
    displayUserName == undefined &&
    window.location.href == "http://localhost:3060/home.html"
) {
    window.location.href = "http://localhost:3060/index.html";
}

const ethEnabled = async() => {
    try {
        if (window.ethereum) {
            acc = await window.ethereum.request({ method: "eth_requestAccounts" });
            window.web3 = new Web3(window.ethereum);

            console.log(acc[0]);
            address = acc[0];
            setBalance();

            return true;
        }
        return false;
    } catch (err) {
        console.log(err);
    }
};

if (typeof web3 !== "undefined") {
    web3 = new Web3(web3.currentProvider);
    console.log("its hear");
} else {
    // set the provider you want from Web3.providers
    // web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

const init = async() => {
    try {
        console.log("init");
        setName();

        governance = await $.getJSON("./abi/governance.json");
        env = await $.getJSON("./env.json");
        ethEnabled();
        console.log("interact");
        contract = await new web3.eth.Contract(governance.abi, env.address);
        const balance = await contract.methods.get().call();
        console.log(balance);
        $("#govBalance").text(balance);
        setBalance();
    } catch (err) {
        console.log(err);
    }
};

const getTokenReword = async() => {
    try {
        console.log(env.address);
        console.log(env.memberAddress);
        console.log(address);

        console.log("get token executed");
        const getToken = await contract.methods
            .transferFromContrect(env.memberAddress, address, 20)
            .send({
                from: address,
            });
        console.log(getToken);

        setBalance();
    } catch (err) {
        console.log("getToken" + err);
        // alert(err.message);
    }
};

const setBalance = async() => {
    try {
        console.log("get token executed");

        const balance = await contract.methods.getblance(address).call();
        const balance2 = await contract.methods.getblance(env.memberAddress).call();
        const balance3 = await contract.methods.getblance(env.address).call();

        console.log(balance);

        $("#userBalance").text(balance);
        $("#memberBalance").text(balance2);
        $("#govBalance").text(balance3);
    } catch (err) {
        console.log("setBalance" + err);
        alert(err.message);
    }
};

window.ethereum.on("accountsChanged", function(accounts) {
    init();
});

const signUp = async() => {
    try {
        console.log("its inside signup");
        let email = $("#username").val();
        let password = $("#password").val();

        res = await axios
            .post(`/app/signUp`, {
                email: email,
                password: password,
            })
            .then((res, err) => {
                console.log(res.data);
                if (err) {
                    console.log("error in sign up");
                }
                alert("user created");
            });
    } catch (err) {
        console.log("signup" + err);
        alert(err);
    }
};

const login = async() => {
    try {
        console.log("login is hear my boi");
        let email = $("#username").val();
        let password = $("#password").val();

        res = await axios
            .post(`/app/login`, {
                email: email,
                password: password,
            })
            .then((res) => {
                console.log(res.data.email);
                localStorage.setItem("displayUserName", res.data.email);

                if (res.data.status === "success") {
                    window.location.href = "http://localhost:3060/home.html";
                }
            });
        // console.log(res);
    } catch (err) {
        console.log(err);
        alert(err.message);
    }
};

const countToken = async() => {
    let noOfToken = $("#token").val();
    let total = noOfToken * 1000;
    $("#youGetToken").text(total);
};

const buyToken = async() => {
    try {
        const wai = $("#token").val();
        const tokenStatus = await contract.methods
            .getToken()
            .send({ from: address, value: wai });
        setBalance();
        console.log(tokenStatus);
    } catch (err) {
        alert(err);
    }
};

const blacklistUser = async() => {
    try {
        const inputAddress = $("#blacklistAdd").val();
        console.log(inputAddress);

        const blackAddress = await contract.methods.blackList(inputAddress).send({
            from: address,
        });
        console.log(address);
        alert(blackAddress);
    } catch (err) {
        alert(err);
    }
};

const whiteListUser = async() => {
    try {
        const inputAddress = $("#whitelistAdd").val();
        const whiteAddress = await contract.methods
            .removeFromBlacklist(inputAddress)
            .send({
                from: address,
            });
        alert("address successfully whiteListed");
    } catch (err) {
        alert(err);
    }
};