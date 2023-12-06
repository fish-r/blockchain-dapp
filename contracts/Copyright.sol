// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MusicCopyrightMarketplace {
    address payable public owner;

    bool private locked;
    
    struct MusicCopyright {
        uint256 id;
        string image_url;
        address artist;
        string artist_name;
        address current_owner;
        string title;
        uint256 price;
        bool isForSale;
    }

    // Constructor to set the owner of the contract
    constructor() {
        owner = payable(msg.sender);
    }

    // Mapping from music copyright ID to its details
    mapping(uint256 => MusicCopyright) public musicCopyrights;

    // An array of keys 
    uint256[] public keys;

    // Event to notify when a music copyright is listed for sale
    event MusicCopyrightListed(uint256 indexed id, string image_url, address indexed artist, string artist_name, address indexed current_owner, string title, uint256 price);

    // Event to notify when a music copyright is registered in profile
    event MusicCopyrightRegistered(uint256 indexed id, string image_url, address indexed artist, string artist_name, address indexed current_owner, string title);

    // Event to notify when a music copyright is re-listed for sale
    event MusicCopyrightReListed(uint256 indexed id, string image_url, address indexed artist, string artist_name, address indexed current_owner, string title, uint256 price);

    // Event to notify when a music copyright is de-listed from marketplace
    event MusicCopyrightDelisted(uint256 indexed id, string image_url, address indexed artist, string artist_name, address indexed current_owner, string title, uint256 price);

    // Event to notify when a music copyright is sold
    event MusicCopyrightSold(uint256 indexed id, address indexed buyer, uint256 price);

    modifier onlyCurrentOwnerOfCopyright (uint256 id) {
        require(musicCopyrights[id].current_owner == msg.sender, "Not the owner of the music copyright");
        _;
    }

    modifier sufficientFunds(uint256 id, uint256 _amount) {
        require(_amount >= musicCopyrights[id].price, "Insufficient fund sent");
        _;
    }

    modifier musicCopyRightExist(uint256 id){
        require(musicCopyrights[id].artist != address(0), "Music copyright ID does not exist");
        _;
    }

    modifier noReentrancy() {
        require(!locked, "Reentrant call");
        locked = true;
        _;
        locked = false;
    }

    // Modifier to ensure a music copyright is listed for sale
    modifier mustBeForSale(uint256 id) { 
        require(musicCopyrights[id].isForSale, "Music copyright not for sale");
        _;
    }

    // Function to allow the owner to register a new music copyright in the profile
    function registerMusicCopyright(uint256 id, string memory image_url, string memory artist_name, string memory title) external {
        require(musicCopyrights[id].artist == address(0), "Music copyright ID already exists");
        
        musicCopyrights[id] = MusicCopyright({
            id: id,
            image_url: image_url,
            artist: msg.sender,
            artist_name: artist_name,
            current_owner: msg.sender,
            title: title,
            price: 0,
            isForSale: false
        });
        keys.push(id);

        emit MusicCopyrightRegistered(id, image_url, msg.sender, artist_name, msg.sender, title);
    }

    // Function to allow the owner to list a new music copyright for sale
    function listMusicCopyright(uint256 id, string memory image_url, string memory artist_name, string memory title, uint256 priceInEther) external {
        require(musicCopyrights[id].artist == address(0), "Music copyright ID already exists");
        
        // Convert Ether to Wei
        uint256 price = priceInEther * 1e18;
        musicCopyrights[id] = MusicCopyright({
            id: id,
            image_url: image_url,
            artist: msg.sender,
            artist_name: artist_name,
            current_owner: msg.sender,
            title: title,
            price: price,
            isForSale: true
        });
        keys.push(id);

        emit MusicCopyrightListed(id, image_url, msg.sender, artist_name, msg.sender, title, price);
    }

    //  Function to relist music into the marketplace
    function reListMusicCopyright(uint256 id, uint256 priceInEther) public musicCopyRightExist(id) onlyCurrentOwnerOfCopyright(id){

        uint256 price = priceInEther * 1e18;
        musicCopyrights[id].price = price;
        musicCopyrights[id].isForSale = true;

        emit MusicCopyrightReListed(id, musicCopyrights[id].image_url, musicCopyrights[id].artist, musicCopyrights[id].artist_name, musicCopyrights[id].current_owner, musicCopyrights[id].title, musicCopyrights[id].price);
    }

    // Function to delist music from the marketplace
    function delistMusicCopyright(uint256 id) public musicCopyRightExist(id) onlyCurrentOwnerOfCopyright(id) {
        musicCopyrights[id].price = 0;
        musicCopyrights[id].isForSale = false;

        emit MusicCopyrightDelisted(id, musicCopyrights[id].image_url, musicCopyrights[id].artist, musicCopyrights[id].artist_name, musicCopyrights[id].current_owner, musicCopyrights[id].title, musicCopyrights[id].price);
    } 

    // Function to buy a music copyright
    function buyMusicCopyright(uint256 id) external payable mustBeForSale(id) sufficientFunds(id, msg.value) noReentrancy{

        address payable artist = payable(musicCopyrights[id].artist);
        uint256 price = musicCopyrights[id].price;

        // Ensure exact payment, refund excess Ether
        
        require(uint256(msg.value) == price, "Excess Ether sent");

        // Transfer funds to the artist
        artist.transfer(price);

        // Mark the music copyright as sold
        musicCopyrights[id].isForSale = false;
        musicCopyrights[id].current_owner = msg.sender;
        musicCopyrights[id].price = 0;

        emit MusicCopyrightSold(id, msg.sender, price);
    }

    // Function to retrieve the details of a music copyright
    function getMusicCopyright(uint256 id) external view musicCopyRightExist(id)returns (MusicCopyright memory){
        MusicCopyright memory music = musicCopyrights[id];
        return music;
    }

    function getMyMusicCopyright(uint256 id) external view musicCopyRightExist(id) returns (MusicCopyright memory){
        MusicCopyright memory music = musicCopyrights[id];
        if (music.current_owner != msg.sender) {
            return MusicCopyright({
                id: 0,
                image_url: "",
                artist: address(0),
                artist_name: "",
                current_owner: address(0),
                title: "",
                price: 0,
                isForSale: false
            });
        }
        return music;
    }

    // Function to get a list of music copyrights
    function getMappingKeys() external view returns (uint256[] memory) {
        return keys;
    }

    receive() external payable {
        revert("Contract does not accept Ether directly");
    }
}