import { Button, Grid, LoadingOverlay, Box } from "@mantine/core"
import { BadgeCard } from "../mantineComponents/BadgeCard"
import { HeaderMegaMenu } from "../mantineComponents/HeaderMegaMenu"
import MantineCarousel from "../mantineComponents/MantineCarousel"
import MantineStack from "../mantineComponents/MantineStack"
import { useEffect, useState } from "react"
import useEthers from "../hooks/useEthers"

const Home = () => {

    const { getListings, data } = useEthers();
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        getListings();
        document.body.style.overflow = !isLoading ? 'auto' : 'hidden'; // Toggle overflow property
    }, [isLoading])


    return (
        <>
            <Button onClick={async () => { console.log(data) }}>Props</Button>

            <LoadingOverlay h={2000} visible={isLoading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />

            <HeaderMegaMenu />
            <MantineCarousel />
            <MantineStack listings={data.listings} setLoading={setLoading} />


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