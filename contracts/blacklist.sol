//SPDX-License-Identifier: Unlicense

import "./2_Owner.sol";

pragma solidity 0.8.7;

contract BlackLkisted is Owner {
    mapping(address => bool) isBlacklisted;

    function blackList(address _user) public isOwner {
        require(!isBlacklisted[_user], "user already blacklisted");
        isBlacklisted[_user] = true;
        // emit events as well
    }

    function removeFromBlacklist(address _user) public isOwner {
        require(isBlacklisted[_user], "user already whitelisted");
        isBlacklisted[_user] = false;
        // emit events as well
    }

    modifier blacklisted1() {
        require(!isBlacklisted[msg.sender], "Recipient is backlisted");
        _;
    }
}
