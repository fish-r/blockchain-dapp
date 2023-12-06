import { useState } from "react"
import { ethers } from "ethers";
import CopyrightArtifact from "../contracts/CopyrightArtifact.json";


const useEthers = () => {

    const HARDHAT_NETWORK_ID = '31337';
    // const contractAddress = '0xe7f1725e7734ce288f8367e1bb143e90bb3f0512'
    const [selectedAddress, setSelectedAddress] = useState()
    const [listings, setListings] = useState([]);
    const [balance, setBalance] = useState();

    const connectWallet = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const addresses = await provider.send("eth_requestAccounts", []);
        setSelectedAddress(addresses[0])
        console.log('connected addresses', addresses)
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

    const getBalance = async () => {
        if (!selectedAddress) await connectWallet();
        const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545/');
        const bal = await provider.getBalance(selectedAddress);
        const converted = Number(bal) / 1e18
        setBalance(converted)
        console.log('converted balance', converted)
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

    const purchaseListing = async (listingObj) => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const writeContract = new ethers.Contract(
            '0xe7f1725e7734ce288f8367e1bb143e90bb3f0512',
            CopyrightArtifact.abi,
            provider.getSigner()
        )
        try {
            const result = await writeContract.buyMusicCopyright(listingObj.id, {
                value: ethers.utils.parseUnits(
                    listingObj.price.toString(), 0
                ), gasLimit: 500000
            })
            console.log(result)
            return result
        } catch (error) {
            console.log('purchase error', error);
        }
    }



    return {
        checkNetwork,
        connectWallet,
        getListings,
        purchaseListing,
        getBalance,
        data: { listings, selectedAddress, balance }
    }
}

export default useEthers;