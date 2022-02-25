//SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.7;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

interface interfaceArkius {
    function total() external view returns (uint256);

    function getblance(address owner) external view returns (uint256);

    function transferToken(address recipient, uint256 amount)
        external
        returns (bool);

    function transferTokenFrom(
        address recipient,
        address spender,
        uint256 amount
    ) external returns (bool);

    function approveToken(address spender, uint256 amount)
        external
        returns (bool);

    function increaseTokenAllowance(address spender, uint256 amount)
        external
        returns (bool);

    function transferTokenFromContrect(
        address sender,
        address recipient,
        address conterctAddress,
        uint256 amount
    ) external returns (bool);

    function approveToken(
        address _owner,
        address spender,
        uint256 amount
    ) external returns (bool);

    function transfer(address recipient, uint256 amount)
        external
        returns (bool);

    function balanceOfUnlockToken(address account) external returns (uint256);

    function transferTokenSell(
        address contractAddress,
        address sender,
        uint256 amount
    ) external returns (bool);
}

contract Arkius is ERC20 {
    uint256 public price;
    // uint256 public initialSupply;
    //ERC20 ERC20Instance;
    address public owner;
    // uint256 constant public decimals1 = 10**18;
    uint256 public scal = 10**18;

    constructor(uint256 _initialSupply) ERC20("ArkiusToken", "ARK") {
        _mint(msg.sender, _initialSupply);
        owner = msg.sender;
    }

    function mint(uint256 moreSupply) public {
        _mint(msg.sender, moreSupply);
    }

    function total() external view returns (uint256) {
        return totalSupply();
    }

    function getblance(address _owner) external view returns (uint256) {
        return balanceOf(_owner);
    }

    function getOwner() external view returns (address) {
        return owner;
    }

    function transferTokenFromContrect(
        address sender,
        address recipient,
        address conterctAddress,
        uint256 amount
    ) external returns (bool) {
        return transferFromContrect(sender, recipient, conterctAddress, amount);
    }

    function transferToken(address recipient, uint256 amount)
        external
        returns (bool)
    {
        return transfer(recipient, amount);
    }

    function transferTokenFrom(
        address recipient,
        address spender,
        uint256 amount
    ) external returns (bool) {
        return transferFrom(recipient, spender, amount);
    }

    function approveToken(address spender, uint256 amount)
        external
        returns (bool)
    {
        return approve(spender, amount);
    }

    function increaseTokenAllowance(address spender, uint256 amount)
        external
        returns (bool)
    {
        return increaseAllowance(spender, amount);
    }

    function transferTo() external view returns (address) {
        return address(this);
    }

    function approveToken(
        address _owner,
        address spender,
        uint256 amount
    ) external returns (bool) {
        return approveFromContract(_owner, spender, amount);
    }

    function transferTokenSell(
        address contractAddress,
        address sender,
        uint256 amount
    ) external returns (bool) {
        return transferTokenAfterSell(contractAddress, sender, amount);
    }
}
