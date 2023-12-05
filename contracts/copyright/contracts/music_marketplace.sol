// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import {RegisterMusicCopyright} from "./register_music_copyright.sol";

contract MusicCatalogue {
    
    // creating and instance of the imported contract
    RegisterMusicCopyright registerMusicCopyright;

    // creating the hash table
    mapping(bytes32 => CopyrightDetails) hashTableForCopyrights;

    // getting copyright details in array form (value)
    struct CopyrightDetails{
        string musicTitle;
        string authorName;
        string imageLink;
        uint256 creationDate;
        uint256 copyrightPrice;
    }

    // add a copyright to the current catalogue of music copyrights
    function getDetails() internal view returns (CopyrightDetails memory){
        string memory _musicTitle = registerMusicCopyright.musicTitle();
        string memory _authorName = registerMusicCopyright.authorName();
        string memory _imageLink = registerMusicCopyright.imageLink();
        uint256 _creationDate = registerMusicCopyright.creationDate();
        uint256 _copyrightPrice = registerMusicCopyright.copyrightPrice();

        return CopyrightDetails({
            musicTitle: _musicTitle,
            authorName: _authorName,
            imageLink: _imageLink, 
            creationDate: _creationDate,
            copyrightPrice: _copyrightPrice
        });
    }

    constructor() {
        address registerAddress = 0xf8e81D47203A594245E36C48e151709F0C19fBe8; // Your RegisterMusicCopyright contract address
        registerMusicCopyright = RegisterMusicCopyright(registerAddress);

        bytes32 musicId = registerMusicCopyright.copyrightID();
        CopyrightDetails memory details = getDetails();
        hashTableForCopyrights[musicId] = details;
    }

    function getCopyrightFromCatalogue(bytes32 _musicId) external view returns (CopyrightDetails memory) {
        return hashTableForCopyrights[_musicId];
    }
    }


