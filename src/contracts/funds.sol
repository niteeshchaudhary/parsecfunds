//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Event} from "./Event.sol";

//sponsor - sendMoney, avalaibleBalance, transactionHistory
contract funds is Event {
    // Each fund needs a sponsor, a timestamp, and amount funded.
    struct Funds {
        address sponsor;
        uint timestamp;
        uint amount;
    }

    // Set `lastUpdated` to `now`
    uint lastUpdated;

    function updateTimestamp() private {
        lastUpdated = block.timestamp;
    }

    // event id to all funds it got
    mapping(uint => Funds[]) public eventSponsors;

    //sponsor contributed to which events (IDs) funded
    mapping(address => uint[]) public sponsorsContributions;

    //update the maps and pay the money
    function sponsorThis(
        address _account,
        uint _eventID,
        uint _amount
    ) external payable {
        updateTimestamp();
            eventSponsors[_eventID].push(Funds(_account, lastUpdated, msg.value));
            sponsorsContributions[_account].push(_eventID);
            payIITDh(iitdh);
    }

    function payIITDh(address payable _recvAddr) public payable {
        bool sent = _recvAddr.send(msg.value);
        if (sent) {}
        //require(sent, "Failed to send Ether");
        // payable(iitdh).transfer(_amount);
    }

    //all events funded by one sponsor
    function gettransactionHistory(
        address _account
    ) public view returns (parsecEvent[] memory) {
        parsecEvent[] memory myFundedEvents;
        for (uint i = 0; i < sponsorsContributions[_account].length; i++) {
            myFundedEvents[i] = events[sponsorsContributions[_account][i]];
        }
        return myFundedEvents;
    }
}
