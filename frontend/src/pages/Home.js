import { Button, Grid } from "@mantine/core"
import { BadgeCard } from "../mantineComponents/BadgeCard"
import { HeaderMegaMenu } from "../mantineComponents/HeaderMegaMenu"
import MantineCarousel from "../mantineComponents/MantineCarousel"
import MantineStack from "../mantineComponents/MantineStack"
import { useEffect, useState } from "react"
import useEthers from "../hooks/useEthers"

const Home = () => {

    const { initialize, connectWallet, getListings, data } = useEthers();
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        getListings();
        if (data.listings.length > 0) setLoading(false)
    }, [data.listings.length])

    return (
        <>
            <Button onClick={async () => { console.log(await connectWallet()) }}>Debug</Button>
            <Button onClick={async () => { console.log(data) }}>Props</Button>
            <HeaderMegaMenu />
            <MantineCarousel />
            <MantineStack listings={data.listings} />


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