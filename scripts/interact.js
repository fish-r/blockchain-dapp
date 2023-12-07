// scripts/interact.js
async function main() {
  const MyContract = await ethers.getContractFactory('MusicCopyrightMarketplace');
  const contract = await MyContract.attach('0xe7f1725e7734ce288f8367e1bb143e90bb3f0512');

  const musicList = [
    {
      "id": 1,
      "image_url": "https://i.ytimg.com/vi/B0pnTn06fhA/maxresdefault.jpg",
      "artist_name": "NERIAH",
      "title": "Lego Blocks",
      "price": 1
    },

    {
      "id": 2,
      "image_url": "https://i.ytimg.com/vi/_g7Dt_q9bYo/hqdefault.jpg",
      "artist_name": "Loote",
      "title": "Wish I Never Met You",
      "price": 1
    },
    {
      "id": 3,
      "image_url": "https://is1-ssl.mzstatic.com/image/thumb/Music123/v4/1b/3f/a3/1b3fa346-a309-e1ac-2529-4dc6c740d41c/8718522255441.png/1200x1200bb.jpg",
      "artist_name": "Mokita",
      "title": "More Than Friends",
      "price": 2
    },
    {
      "id": 4,
      "image_url": "https://cdn11.bigcommerce.com/s-n6xu9mhtxs/images/stencil/1280x1280/products/174/506/IMG_E9274__57437.1634404191.JPG?c=1",
      "artist_name": "Post Malone",
      "title": "Circles",
      "price": 2
    },
    {
      "id": 5,
      "image_url": "https://i.scdn.co/image/ab67616d0000b273c7a37e0649c5bea6f9ec3aff",
      "artist_name": "LANY",
      "title": "Pink Skies",
      "price": 2
    }, {
      "id": 6,
      "image_url": "https://upload.wikimedia.org/wikipedia/en/thumb/5/53/Doja_Cat_-_Paint_the_Town_Red.png/220px-Doja_Cat_-_Paint_the_Town_Red.png",
      "artist_name": "Doja Cat",
      "title": "Paint The Town Red",
      "price": 2
    }, {
      "id": 7,
      "image_url": "https://i.scdn.co/image/ab67616d0000b27328d0067b8d01b6192c88b77d",
      "artist_name": "Charlie Puth",
      "title": "That's Not How This Works",
      "price": 3
    }, {
      "id": 8,
      "image_url": "https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/85/af/98/85af9885-8da2-9c57-9b45-a1f6d84f0eda/22UM1IM21906.rgb.jpg/600x600bf-60.jpg",
      "artist_name": "Chelsea Cutler",
      "title": "Men On The Moon",
      "price": 2
    }, {
      "id": 9,
      "image_url": "https://i.scdn.co/image/ab67616d0000b273488df3d22b1f5c0ea15b686a",
      "artist_name": "NIKI",
      "title": "La La Lost You",
      "price": 2
    }, {
      "id": 10,
      "image_url": "https://i.scdn.co/image/ab67616d0000b273da98c27ce49eb933beac3a72",
      "artist_name": "Suriel Hess",
      "title": "Sick Of You",
      "price": 2
    },

  ]


  const resposne = musicList.map(async (each) => {
    const listMusic = await contract.listMusicCopyright(
      each.id, each.image_url, each.artist_name, each.title, each.price
    )
    return listMusic
  })

  const res = await Promise.all(resposne)
  console.log(res)

}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });