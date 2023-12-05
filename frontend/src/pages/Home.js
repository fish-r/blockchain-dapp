import { Grid, GridCol } from "@mantine/core"
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

    const connectWallet = async () => {
        const [addr] = await window.ethereum.request({ method: 'eth_requestAccounts' });
        checkNetwork();
        console.log(addr);
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
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const check = await provider.getCode('0xe7f1725e7734ce288f8367e1bb143e90bb3f0512')
        console.log(check)

        // calling contract
        const contract = new ethers.Contract(
            '0xe7f1725e7734ce288f8367e1bb143e90bb3f0512',
            CopyrightArtifact.abi,
            provider.getSigner(0)
        )

        const test = await contract.getAllMusicCopyrights(10)
        console.log(test)
    }

    useEffect(() => { initialize() }, [])

    return (
        <>

            <HeaderMegaMenu connectWallet={connectWallet} addr={selectedAddress} />
            <MantineCarousel />
            <MantineStack></MantineStack>


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