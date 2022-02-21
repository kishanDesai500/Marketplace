//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.7;

import "./Arkius.sol";
import "./blacklist.sol";

interface interfaceGov {
    function transferTokenForAVAX(address recipient, uint256 amount)
        external
        returns (bool);

    // function calculatPrice(uint256 AVAX) external view returns (uint256);
}

contract governance is BlackLkisted {
    uint256 price = 1000;

    address addressToken;
    interfaceArkius arkius;

    function setAddressToken(address _addressToken) external {
        addressToken = _addressToken;
        arkius = interfaceArkius(addressToken);
    }

    function get() public view blacklisted1 returns (uint256) {
        return arkius.total();
    }

    function getblance(address owner) external view returns (uint256) {
        return arkius.getblance(owner);
    }

    function calculatPrice(uint256 AVAX) public returns (uint256) {
        uint256 tokens;
        tokens = (AVAX * price);
        return tokens;
    }

    function transferTokenForAVAX(address recipient, uint256 amount)
        private
        returns (bool)
    {
        return arkius.transferToken(recipient, amount);
    }

    function getToken() external payable {
        uint256 amount = calculatPrice(msg.value);
        transferTokenForAVAX(msg.sender, amount);
    }

    function transferTokanReword(address recipient) external returns (bool) {
        return arkius.transferToken(recipient, 5);
    }

    function tokenAllowance(address spender, uint256 amount)
        external
        returns (bool)
    {
        return arkius.approveToken(spender, amount);
    }

    function transferTokenFrom(
        address recipient,
        address spender,
        uint256 amount
    ) external returns (bool) {
        return arkius.transferTokenFrom(recipient, spender, amount);
    }

    function transferFromContrect(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool) {
        return
            arkius.transferTokenFromContrect(
                sender,
                recipient,
                address(this),
                amount
            );
    }

    function approveToken(address spender, uint256 amount)
        external
        returns (bool)
    {
        return arkius.approveToken(msg.sender, spender, amount);
    }
}
