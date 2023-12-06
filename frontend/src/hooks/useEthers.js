import { useEffect, useState } from "react"
import { ethers } from "ethers";
import CopyrightArtifact from "../contracts/CopyrightArtifact.json";


const useEthers = () => {

    const HARDHAT_NETWORK_ID = '31337';
    // const contractAddress = '0xe7f1725e7734ce288f8367e1bb143e90bb3f0512'
    const [selectedAddress, setSelectedAddress] = useState()
    const [listings, setListings] = useState([]);

    const connectWallet = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const addresses = await provider.send("eth_requestAccounts", []);
        setSelectedAddress(addresses[0])
        console.log(addresses)
        // const [addr] = await window.ethereum.request({ method: 'eth_requestAccounts' });
        // setSelectedAddress(addr)
        // checkNetwork();
        // initialize(selectedAddress);

        // We reinitialize it whenever the user changes their account.
        window.ethereum.on("accountsChanged", ([newAddress]) => {
            // stopPollingData();
            if (newAddress === undefined) {
                // return resetState();
            }
            // initialize(newAddress);
            setSelectedAddress(newAddress)
        });
        // return addr
    }

    const tryConnectWallet = () => {
        // Check if MetaMask is installed
        if (typeof window.ethereum !== 'undefined') {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            // Request access to the user's MetaMask account
            window.ethereum.request({ method: 'eth_requestAccounts' });
            // Set ethers provider to MetaMask
            // ethers.provider = provider;
            console.log(provider)
        } else {
            // MetaMask is not installed or not available
            console.log('Please install MetaMask to interact with the Ethereum network.');
        }
    }

    // This method checks if the selected network is Localhost:8545
    const checkNetwork = async () => {
        if (window.ethereum.networkVersion !== HARDHAT_NETWORK_ID) {
            const chainIdHex = `0x${HARDHAT_NETWORK_ID.toString(16)}`
            await window.ethereum.request({
                method: "wallet_switchEthereumChain",
                params: [{ chainId: chainIdHex }],
            });
            // await initialize(loginState.selectedAddress);
        }

    }

    const initialize = async () => {
        const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545/');
        console.log(selectedAddress)

        // calling contract
        const contract = new ethers.Contract(
            '0xe7f1725e7734ce288f8367e1bb143e90bb3f0512',
            CopyrightArtifact.abi,
            provider
        )

        try {
            const response = await contract.getMappingKeys()
            const listings = []
            for (const id in response) {
                const each = await contract.getMusicCopyright(id)
                listings.push(each)
            }
            setListings(listings);
        } catch (error) {
            console.log(error)
        }

    }

    const getListings = async () => {
        const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545/');
        const contract = new ethers.Contract(
            '0xe7f1725e7734ce288f8367e1bb143e90bb3f0512',
            CopyrightArtifact.abi,
            provider
        )
        try {
            const response = await contract.getMappingKeys()
            const listings = []
            for (const id in response) {
                const each = await contract.getMusicCopyright(id)
                listings.push(each)
            }
            setListings(listings);
            return listings;
        } catch (error) {
            console.log(error)
        }
    }

    const purchaseListing = async (listingId) => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        console.log('signer', provider.getSigner())
        const writeContract = new ethers.Contract(
            '0xe7f1725e7734ce288f8367e1bb143e90bb3f0512',
            CopyrightArtifact.abi,
            provider.getSigner()
        )
        try {
            console.log('est gas', provider.estimateGas())
            const result = await writeContract.buyMusicCopyright(listingId)
            await result.wait();
            console.log('purchase result', result)
        } catch (error) {
            console.log('purchase error', error);
        }
    }



    return {
        initialize,
        checkNetwork,
        connectWallet,
        tryConnectWallet,
        getListings,
        purchaseListing,
        data: { listings, selectedAddress }
    }
}

export default useEthers;