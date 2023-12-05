// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract MusicCatalogue {
    // import {} from "./examplecontract.sol";
    
    string musicTitle;
    struct Author {
        string name;
    }
    Author[] public musicOwners;
    uint256 creationDate;


    // function store(uint256 num) public {
    //     number = num;
    // }

    // /**
    //  * @dev Return value 
    //  * @return value of 'number'
    //  */
    // function retrieve() public view returns (uint256){
    //     return number;
    // }
}