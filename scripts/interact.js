// scripts/interact.js
async function main() {
  const MyContract = await ethers.getContractFactory('MusicCopyrightMarketplace');
  const myContract = await MyContract.attach('0xe7f1725e7734ce288f8367e1bb143e90bb3f0512');

  const musicList = [];
  for (index = 0; index < 10; index += 1) {
    musicList.push({
      id: index,
      image_url: 'https://t4.ftcdn.net/jpg/00/10/33/17/360_F_10331779_PVOLBM8MIeDZW9H0vc3Cr0nLMoSEO8Le.jpg',
      artist_name: `artist${index}`,
      title: `title ${index}`,
      price: index
    })
  }

  const obj = {
    id: 1,
    image_url: 'https://t4.ftcdn.net/jpg/00/10/33/17/360_F_10331779_PVOLBM8MIeDZW9H0vc3Cr0nLMoSEO8Le.jpg',
    artist_name: `artist${1}`,
    title: `title ${1}`,
    price: 3
  }
  // musicList.map(async (each) => {
  //   const listMusic = await myContract.listMusicCopyright(
  //     each.id, each.image_url, each.artist_name, each.title, each.price
  //   )
  //   console.log(listMusic)
  // })

  const listMusic = await myContract.listMusicCopyright(
    obj.id, obj.image_url, obj.artist_name, obj.title, obj.price
  )
  console.log(listMusic)
  // Call contract functions or perform interactions here
  // const listMusic = await myContract.listMusicCopyright(1, "www.drive.com", "Justin Bieber", "Sad", 2);

  // console.log("Listed Music: ", listMusic);

  // const musicCopyright = await myContract.getMusicCopyright(1);

  // console.log("Music copyright id 1", musicCopyright);

  const allmusicCopyright = await myContract.getMappingKeys();
  // const single = await myContract.getMusicCopyright(1);


  console.log("All Music copyright", allmusicCopyright);
  // console.log("Single", single);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });