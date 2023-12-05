// scripts/interact.js
async function main() {
  const MyContract = await ethers.getContractFactory('MusicCopyrightMarketplace');
  const contract = await MyContract.attach('0xe7f1725e7734ce288f8367e1bb143e90bb3f0512');

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

  const test = musicList.map(async (each) => {
    const listMusic = await contract.listMusicCopyright(
      each.id, each.image_url, each.artist_name, each.title, each.price
    )
    return listMusic
  })

  const res = await Promise.all(test)
  console.log(res)



  const allmusicCopyright = await contract.getMappingKeys();
  // const single = await contract.getMusicCopyright(1);


  console.log("All Music copyright", allmusicCopyright);
  // console.log("Single", single);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });