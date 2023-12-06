import { useState } from "react"
import { ethers } from "ethers";
import CopyrightArtifact from "../contracts/CopyrightArtifact.json";


const useEthers = () => {

    const HARDHAT_NETWORK_ID = '31337';
    // const contractAddress = '0xe7f1725e7734ce288f8367e1bb143e90bb3f0512'
    const [selectedAddress, setSelectedAddress] = useState('')
    // listings refers to available for sale on mktplace = isForSale == True
    const [listings, setListings] = useState([]);
    const [balance, setBalance] = useState();
    // my listings = all listings belonging to current address, for sale or not
    const [myListings, setMyListings] = useState([]);
    const [allListings, setAllListings] = useState([])

    const connectWallet = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const addresses = await provider.send("eth_requestAccounts", []);
        // checkNetwork();
        // We reinitialize it whenever the user changes their account.
        window.ethereum.on("accountsChanged", ([newAddress]) => {
            // stopPollingData();
            if (newAddress === undefined) {
                // return resetState();
            }
            // initialize(newAddress);
            setSelectedAddress(newAddress)
        });
        setSelectedAddress(addresses[0])
        return addresses[0];
    }

    const getBalance = async () => {
        if (!selectedAddress) await connectWallet();
        const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545/');
        const bal = await provider.getBalance(selectedAddress);
        const converted = Number(bal) / 1e18
        setBalance(converted)
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
        const addr = await connectWallet()
        const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545/');
        const contract = new ethers.Contract(
            '0xe7f1725e7734ce288f8367e1bb143e90bb3f0512',
            CopyrightArtifact.abi,
            provider
        )
        try {
            const response = await contract.getMappingKeys()
            const mktListings = []
            const userListings = []
            const all = []
            for (const id of response) {
                const each = await contract.getMusicCopyright(id)
                const parsed = Object.assign({}, each)
                const isOwner = parsed.current_owner.toUpperCase() === addr.toUpperCase();
                if (parsed.isForSale && !isOwner) mktListings.push(parsed)
                // funny issue where one letter is different casing
                if (isOwner) {
                    userListings.push(parsed)
                } all.push(parsed)
            }
            setListings(mktListings);
            setMyListings(userListings)
            setAllListings(all)
            console.log('userListings', myListings)
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

    const listOnMarket = async (listingObj, listPrice) => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const writeContract = new ethers.Contract(
            '0xe7f1725e7734ce288f8367e1bb143e90bb3f0512',
            CopyrightArtifact.abi,
            provider.getSigner()
        )
        try {
            const result = await writeContract.reListMusicCopyright(
                listingObj.id,
                listPrice,
                {
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

    const unlistFromMarket = async (listingObj) => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const writeContract = new ethers.Contract(
            '0xe7f1725e7734ce288f8367e1bb143e90bb3f0512',
            CopyrightArtifact.abi,
            provider.getSigner()
        )
        try {
            const result = await writeContract.delistMusicCopyright(
                listingObj.id, {
                gasLimit: 500000
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
        listOnMarket,
        unlistFromMarket,
        data: { listings, selectedAddress, balance, myListings, allListings }
    }
}

export default useEthers;