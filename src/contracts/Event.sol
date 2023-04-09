//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Event {
    //dealers
    address payable public iitdh;

    //events
    struct parsecEvent {
        uint id;
        string name;
        uint year;
        string organiserName;
    }

    //all events till date
    uint eventCount = 0;
    parsecEvent[] public events;

    constructor() {
        iitdh = payable(0xdFa86baaa47B5A59c6C41F90efE3bF37E7EAEa5C);
    }

    modifier onlyIITDh() {
        require(iitdh == 0xdFa86baaa47B5A59c6C41F90efE3bF37E7EAEa5C);
        _;
    }

    function createEvent(
        string memory _name,
        uint _year,
        string memory _organiser
    ) public {
        eventCount++;
        events.push(parsecEvent(eventCount, _name, _year, _organiser));
    }

    function getEvents() public view returns (parsecEvent[] memory) {
        return events;
    }
}
