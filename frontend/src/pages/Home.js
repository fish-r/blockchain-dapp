import { Grid, LoadingOverlay, Text, Center } from "@mantine/core"
import { BadgeCard } from "../mantineComponents/BadgeCard"
import { HeaderMegaMenu } from "../mantineComponents/HeaderMegaMenu"
import MantineCarousel from "../mantineComponents/MantineCarousel"
import MantineStack from "../mantineComponents/MantineStack"
import { useEffect, useState } from "react"
import useEthers from "../hooks/useEthers"

const Home = () => {

    const { getListings, data } = useEthers();
    const [isLoading, setLoading] = useState(false);
    console.log(data)
    useEffect(() => {
        setTimeout(() => {
            getListings()
        }, 1500);
        document.body.style.overflow = !isLoading ? 'auto' : 'hidden'; // Toggle overflow property
    }, [isLoading])

    // listing is array of arrays
    // convert each array into obj
    const tableListings = data.listings?.slice(0, 5)

    const cardListings = data.listings?.slice(6, 10)

    return (
        <>
            <LoadingOverlay h={2000} visible={isLoading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />

            <HeaderMegaMenu selectedAddress={data.selectedAddress} />
            <MantineCarousel />
            <Center >
                <Text fz="xl" fw={500}>Top Copyrights</Text>
            </Center>
            <MantineStack listings={tableListings} setLoading={setLoading} />
            {cardListings.length > 0 ?
                <Center >
                    <Text fz="xl" fw={500}>Recommended</Text>
                </Center> :
                <></>}
            <Grid p={20}>
                {cardListings.map((each) => {
                    return (
                        <>
                            <Grid.Col span={3}>
                                <BadgeCard listing={each} setLoading={setLoading} />
                            </Grid.Col>
                        </>)
                }
                )}

            </Grid >

        </>
    )
}

export default Home