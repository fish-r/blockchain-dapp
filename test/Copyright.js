// SPDX-License-Identifier: MIT
// test/MusicCopyrightMarketplace.test.js
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MusicCopyrightMarketplace", function () {
  let owner;
  let artist;
  let buyer;
  let marketplace;

  beforeEach(async function () {
    [owner, artist, buyer] = await ethers.getSigners();

    const MusicCopyrightMarketplace = await ethers.getContractFactory("MusicCopyrightMarketplace");
    marketplace = await MusicCopyrightMarketplace.deploy();
    await marketplace.deployed();
  });

  it("should register a new music copyright", async function () {
    const image_url = "https://example.com/image.jpg";
    const artist_name = "John Doe";
    const title = "Awesome Song";
    const id = 1;

    await marketplace.connect(artist).registerMusicCopyright(id, image_url, artist_name, title);

    const result = await marketplace.getMusicCopyright(id);

    expect(result[0]).to.equal(id);
    expect(result[1]).to.equal(image_url);
    expect(result[2]).to.equal(artist.address);
    expect(result[3]).to.equal(artist_name);
    expect(result[4]).to.equal(artist.address);
    expect(result[5]).to.equal(title);
    expect(result[6]).to.equal(0); // price
    expect(result[7]).to.equal(false); // isForSale
  });

  it("should list a new music copyright for sale", async function () {
    const image_url = "https://example.com/image.jpg";
    const artist_name = "John Doe";
    const title = "Awesome Song";
    const id = 1;
    const priceInEther = BigInt(1);

    await marketplace.connect(artist).listMusicCopyright(id, image_url, artist_name, title, priceInEther);

    const result = await marketplace.getMusicCopyright(id);
    const resultPrice = BigInt(priceInEther) * BigInt(1e18);

    expect(result[0]).to.equal(id);
    expect(result[1]).to.equal(image_url);
    expect(result[2]).to.equal(artist.address);
    expect(result[3]).to.equal(artist_name);
    expect(result[4]).to.equal(artist.address);
    expect(result[5]).to.equal(title);
    expect(result[6]).to.equal(resultPrice); // price
    expect(result[7]).to.equal(true); // isForSale
  });

  it("should buy a music copyright", async function () {
    const image_url = "https://example.com/image.jpg";
    const artist_name = "John Doe";
    const title = "Awesome Song";
    const id = 1;
    const priceInEther = 1;
    const priceResult = BigInt(priceInEther) * BigInt(1e18);

    await marketplace.connect(artist).listMusicCopyright(id, image_url, artist_name, title, priceInEther);

    const initialBalanceArtist = await artist.getBalance();
    const initialBalanceBuyer = await buyer.getBalance();

    await marketplace.connect(buyer).buyMusicCopyright(id, { value: priceResult });


    const result = await marketplace.getMusicCopyright(id);
    const finalBalanceArtist = await artist.getBalance();
    const balanceAddedToArtist = finalBalanceArtist.sub(initialBalanceArtist);
    const finalBalanceBuyer = await buyer.getBalance();
    const balanceRemovedFromBuyer = initialBalanceBuyer.sub(finalBalanceBuyer);

    expect(result[7]).to.equal(false); // isForSale
    expect(result[4]).to.equal(buyer.address); // current_owner

    // Check if the funds were transferred correctly
    expect(balanceAddedToArtist).to.equal(priceResult);
    // buyer's balance should be lesser than the price because of gas fees
    expect(balanceRemovedFromBuyer).not.equal(priceResult);
  });

  it("should return correct details for registered music copyright", async function () {
    const id = 1;
    const image_url = "example.com/image.jpg";
    const artist_name = "Artist";
    const title = "Song Title";

    // Register a new music copyright
    await marketplace.connect(artist).registerMusicCopyright(id, image_url, artist_name, title);

    // Get the music copyright details
    const result = await marketplace.connect(artist).getMusicCopyright(id);

    // Verify the returned details
    expect(result.id).to.equal(id);
    expect(result.image_url).to.equal(image_url);
    expect(result.artist).to.equal(artist.address);
    expect(result.artist_name).to.equal(artist_name);
    expect(result.current_owner).to.equal(artist.address);
    expect(result.title).to.equal(title);
    expect(result.price).to.equal(0);
    expect(result.isForSale).to.equal(false);
  });

  it("should return correct details for listed music copyright", async function () {
    const id = 1;
    const image_url = "example.com/image.jpg";
    const artist_name = "Artist";
    const title = "Song Title";
    const priceInEther = 1;
    const priceResult = BigInt(priceInEther) * BigInt(1e18);

    // List a new music copyright
    await marketplace.connect(artist).listMusicCopyright(id, image_url, artist_name, title, priceInEther);

    // Get the music copyright details
    const result = await marketplace.connect(artist).getMusicCopyright(id);

    // Verify the returned details
    expect(result.id).to.equal(id);
    expect(result.image_url).to.equal(image_url);
    expect(result.artist).to.equal(artist.address);
    expect(result.artist_name).to.equal(artist_name);
    expect(result.current_owner).to.equal(artist.address);
    expect(result.title).to.equal(title);
    expect(result.price).to.equal(priceResult);
    expect(result.isForSale).to.equal(true);
  });
});
