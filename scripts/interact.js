// scripts/interact.js
async function main() {
    const MyContract = await ethers.getContractFactory('MusicCopyrightMarketplace');
    const myContract = await MyContract.attach('0xe7f1725e7734ce288f8367e1bb143e90bb3f0512');
  
    // Call contract functions or perform interactions here
    const listMusic = await myContract.listMusicCopyright(2, "Sad", 2);

    console.log("Listed Music: ", listMusic);

    const musicCopyright = await myContract.getMusicCopyright(1);
    
    console.log("Music copyright id 1", musicCopyright);
  }
  
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });