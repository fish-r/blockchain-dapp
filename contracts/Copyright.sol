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

    // Event to notify when a music copyright is listed for sale
    event MusicCopyrightListed(uint256 indexed id, string image_url, address indexed artist, string artist_name, address indexed current_owner, string title, uint256 price);

    // Evenet to notify when a music copyright is re-listed for sale
    event MusicCopyrightReListed(uint256 indexed id, string image_url, address indexed artist, string artist_name, address indexed current_owner, string title, uint256 price);

    // Event to notify when a music copyright is sold
    event MusicCopyrightSold(uint256 indexed id, address indexed buyer, uint256 price);

    // Modifier to ensure only the owner can perform certain actions
    // modifier onlyOwner() {
    //     require(msg.sender == owner, "Not the owner");
    //     _;
    // }

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

        emit MusicCopyrightListed(id, image_url, msg.sender, artist_name, msg.sender, title, price);
    }

    function reListMusicCopyright(uint256 id, uint256 priceInEther) public musicCopyRightExist(id){
        require(musicCopyrights[id].current_owner == msg.sender, "Not the owner of the music");

        uint256 price = priceInEther * 1e18;
        MusicCopyright memory oneMusicCopyright = MusicCopyright({
            id: id,
            image_url: musicCopyrights[id].image_url,
            artist: musicCopyrights[id].artist,
            artist_name: musicCopyrights[id].artist_name,
            current_owner: musicCopyrights[id].current_owner,
            title: musicCopyrights[id].title,
            price: price,
            isForSale: true
        });

        musicCopyrights[id] = oneMusicCopyright;

        emit MusicCopyrightReListed(id, oneMusicCopyright.image_url, oneMusicCopyright.artist, oneMusicCopyright.artist_name, oneMusicCopyright.current_owner, oneMusicCopyright.title, oneMusicCopyright.price);
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

        emit MusicCopyrightSold(id, msg.sender, price);
    }

    // Function to retrieve the details of a music copyright
    function getMusicCopyright(uint256 id) external view musicCopyRightExist(id)returns (uint256, string memory, address, string memory, address, string memory, uint256, bool) {
        MusicCopyright memory music = musicCopyrights[id];
        return (id, music.image_url, music.artist, music.artist_name, music.current_owner, music.title, music.price, music.isForSale);
    }

    // Function to get a list of music copyrights currently listed for sale
    function getMusicCopyrightsForSale(uint256 size) external view returns (MusicCopyright[] memory) {
        MusicCopyright[] memory musics = new MusicCopyright[](size);

        for (uint256 id = 0; id < size; id++) { 
            MusicCopyright memory music;
            if (musicCopyrights[id].artist != address(0)){
                if (musicCopyrights[id].isForSale) {
                    music.id = musicCopyrights[id].id;
                    music.image_url = musicCopyrights[id].image_url;
                    music.artist = musicCopyrights[id].artist;
                    music.artist_name = musicCopyrights[id].artist_name;
                    music.current_owner = musicCopyrights[id].current_owner;
                    music.title = musicCopyrights[id].title;
                    music.price = musicCopyrights[id].price;
                }
            }
            musics[id] = music;
        }
        return musics;
    }

    // Function to get a list of music copyrights
    function getAllMusicCopyrights(uint256 size) external view returns (MusicCopyright[] memory) {
        MusicCopyright[] memory musics = new MusicCopyright[](size);

        for (uint256 id = 0; id < size; id++) { 
            MusicCopyright memory music;
            if (musicCopyrights[id].artist != address(0)){
                music.id = musicCopyrights[id].id;
                music.image_url = musicCopyrights[id].image_url;
                music.artist = musicCopyrights[id].artist;
                music.artist_name = musicCopyrights[id].artist_name;
                music.current_owner = musicCopyrights[id].current_owner;
                music.title = musicCopyrights[id].title;
                music.price = musicCopyrights[id].price;
            }
            musics[id] = music;
        }
        return musics;
    }

    receive() external payable {
        revert("Contract does not accept Ether directly");
    }
}