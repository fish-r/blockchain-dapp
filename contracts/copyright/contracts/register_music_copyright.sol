// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract RegisterMusicCopyright {
    // import {} from "./music_catalogue.sol";
    
    string public musicTitle;
    string public authorName;
    string public imageLink;
    // struct Author {
    //     string name;
    // }
    // Author[] public musicOwners;
    uint256 public creationDate;
    uint256 public copyrightPrice;

    function setMusicTitle(string memory _musicTitle) external {
        musicTitle = _musicTitle;
    }

    function setAuthorName(string memory _authorName) external {
        authorName = _authorName;
    }

    function setImageLink(string memory _imageLink) external {
        imageLink = _imageLink;
    }

        function setCreationDate(uint256 _creationDate) external {
        creationDate = _creationDate;
    }

        function setCopyrightPrice(uint256 _copyrightPrice) external {
        copyrightPrice = _copyrightPrice;
    }

    function copyrightID() external view returns (bytes32) {
        bytes32 hashID = keccak256(abi.encodePacked(musicTitle, authorName, imageLink, creationDate, copyrightPrice));
        return hashID;
    }
}