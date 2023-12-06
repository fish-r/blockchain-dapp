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
    const id = 1n;

    await marketplace.connect(artist).registerMusicCopyright(id, image_url, artist_name, title);

    const result = await marketplace.getMusicCopyright(id);

    expect(result[0]).to.equal(id);
    expect(result[1]).to.equal(image_url);
    expect(result[2]).to.equal(artist.address);
    expect(result[3]).to.equal(artist_name);
    expect(result[4]).to.equal(artist.address);
    expect(result[5]).to.equal(title);
    expect(result[6]).to.equal(0n); // price
    expect(result[7]).to.equal(false); // isForSale
  });

  it("should list a new music copyright for sale", async function () {
    const image_url = "https://example.com/image.jpg";
    const artist_name = "John Doe";
    const title = "Awesome Song";
    const id = 1;
    const priceInEther = 1;

    await marketplace.connect(artist).listMusicCopyright(id, image_url, artist_name, title, priceInEther);

    const result = await marketplace.getMusicCopyright(id);

    expect(result[0]).to.equal(id);
    expect(result[1]).to.equal(image_url);
    expect(result[2]).to.equal(artist.address);
    expect(result[3]).to.equal(artist_name);
    expect(result[4]).to.equal(artist.address);
    expect(result[5]).to.equal(title);
    expect(result[6]).to.equal(priceInEther * 1e18); // price
    expect(result[7]).to.equal(true); // isForSale
  });

  it("should buy a music copyright", async function () {
    const image_url = "https://example.com/image.jpg";
    const artist_name = "John Doe";
    const title = "Awesome Song";
    const id = 1;
    const priceInEther = 1;

    await marketplace.connect(artist).listMusicCopyright(id, image_url, artist_name, title, priceInEther);

    const initialBalanceArtist = await artist.getBalance();
    const initialBalanceBuyer = await buyer.getBalance();

    await marketplace.connect(buyer).buyMusicCopyright(id, { value: priceInEther * 1e18 });

    const result = await marketplace.getMusicCopyright(id);
    const finalBalanceArtist = await artist.getBalance();
    const finalBalanceBuyer = await buyer.getBalance();

    expect(result[7]).to.equal(false); // isForSale
    expect(result[4]).to.equal(buyer.address); // current_owner

    // Check if the funds were transferred correctly
    expect(finalBalanceArtist.sub(initialBalanceArtist)).to.equal(priceInEther * 1e18);
    expect(initialBalanceBuyer.sub(finalBalanceBuyer)).to.equal(priceInEther * 1e18);
  });

  // Add more tests for other functions as needed
});