import { Grid, GridCol } from "@mantine/core"
import { BadgeCard } from "../mantineComponents/BadgeCard"
import { HeaderMegaMenu } from "../mantineComponents/HeaderMegaMenu"
import MantineCarousel from "../mantineComponents/MantineCarousel"

const Dashboard = () => {


    return (
        <>

            <HeaderMegaMenu />
            <MantineCarousel />



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

export default Dashboard