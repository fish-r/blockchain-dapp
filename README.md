# Blockchain Dapp

This repository contains a Blockchain Dapp project made for SUTD's Blockchain Technology 50.037 mod.

## Introduction
In an era where the digital landscape is rapidly transforming how we interact with creative content, there is increasing emphasis on efficient management and exchange of music rights for the empowerment of artists and the vibrancy of the music industry. Our Decentralized Application, the Music Rights Selling Software, addresses the challenges encountered in the current music rights marketplace. This web application is designed to usher in a new paradigm of transparency, security, and efficiency for artists, rights holders, and music industry professionals.

Our DApp aims to dismantle these barriers by establishing a decentralized marketplace that not only streamlines the transactional process but also redefines it. By leveraging blockchain technology and smart contracts, our platform ensures that every transaction is immutable, transparent, and directly between parties, thereby eliminating unnecessary intermediaries and reducing the potential for disputes.

[Link to Demo](https://drive.google.com/file/d/1MNfLdXaE9OMNrMd9UQ5N_7B9mz2K-c4g/view?usp=drive_link)

## Quick start

The first things you need to do are cloning this repository and installing its
dependencies:

```sh
git clone https://github.com/fish-r/blockchain-dapp.git
npm install
```

Once installed, let's run Hardhat's testing network:

```sh
npx hardhat node
```

Then, on a new terminal, go to the repository's root folder and run this to
deploy your contract:

```sh
npx hardhat run scripts/deploy.js --network localhost
```

Once the contract(s) has been deployed, run the following command to seed sample data:

```sh
npx hardhat run scripts/seed.js --network localhost
```

Finally, we can run the frontend with:

```sh
cd frontend
npm install
npm start
```

Open [http://localhost:3000/](http://localhost:3000/) to see your Dapp. You will
need to have [Coinbase Wallet](https://www.coinbase.com/wallet) or [Metamask](https://metamask.io) installed and listening to
`localhost 8545`.

## User Guide

### Project Structure

- Source code for the frontend components can be found in /frontend
- Smart contracts can be found under /contracts
- Test cases can be found under /test
- Scripts for deployment and seeding can be found under /scripts

### Testing


## Troubleshooting

- `Invalid nonce` errors: if you are seeing this error on the `npx hardhat node`
  console, try resetting your Metamask account. This will reset the account's
  transaction history and also the nonce. Open Metamask, click on your account
  followed by `Settings > Advanced > Clear activity tab data`.



