import { Grid } from "@mantine/core"
import { BadgeCard } from "../mantineComponents/BadgeCard"
import { HeaderMegaMenu } from "../mantineComponents/HeaderMegaMenu"
import MantineCarousel from "../mantineComponents/MantineCarousel"
import MantineStack from "../mantineComponents/MantineStack"
import { ethers } from "ethers";
import CopyrightArtifact from "../contracts/CopyrightArtifact.json";
import { useEffect, useState } from "react"

const Home = () => {
    const HARDHAT_NETWORK_ID = '31337';
    const [selectedAddress, setSelectedAddress] = useState({})
    const [listings, setListings] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const connectWallet = async () => {
        const [addr] = await window.ethereum.request({ method: 'eth_requestAccounts' });
        checkNetwork();
        // initialize(selectedAddress);

        // We reinitialize it whenever the user changes their account.
        window.ethereum.on("accountsChanged", ([newAddress]) => {
            // stopPollingData();
            if (newAddress === undefined) {
                // return resetState();
            }
            // initialize(newAddress);
            setSelectedAddress(selectedAddress)
        });
        return addr

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
                console.log('each', each)
            }
            console.log('listings', listings)

            setListings(listings);
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        initialize();
        if (listings.length > 0) setLoading(false)
    }, [listings.length])

    return (
        <>

            <HeaderMegaMenu connectWallet={connectWallet} addr={selectedAddress} />
            <MantineCarousel />
            <MantineStack isLoading={isLoading} listings={{ listings }} ></MantineStack>


            <Grid p={20}>
                <Grid.Col span={3}>
                    <BadgeCard />
                </Grid.Col>

                <Grid.Col span={3}>
                    <BadgeCard />
                </Grid.Col>

                <Grid.Col span={3}>
                    <BadgeCard />
                </Grid.Col>

                <Grid.Col span={3}>
                    <BadgeCard />
                </Grid.Col>

            </Grid>
        </>
    )
}

export default Home