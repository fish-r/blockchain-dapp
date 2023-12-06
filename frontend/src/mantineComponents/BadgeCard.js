import { Card, Image, Text, Group, Badge, Button } from '@mantine/core';
import classes from './BadgeCard.module.css';
import useEthers from '../hooks/useEthers';


export function BadgeCard(props) {
    const listing = props.listing;
    const { purchaseListing } = useEthers();

    return (
        <Card withBorder radius="md" p="md" className={classes.card}>
            <Card.Section>
                <Image src={listing.image_url} alt={listing.title} height={180} />
            </Card.Section>

            <Card.Section className={classes.section} mt="md" pl="md">
                <Group justify="apart">
                    <Text fz="lg" fw={500}>
                        {listing.title}
                    </Text>
                    <Badge size="sm" variant="light">
                        {listing.artist_name}
                    </Badge>
                </Group>

            </Card.Section>

            <Card.Section className={classes.section} pl="md">
                <Text mt="md" className={classes.label} c="dimmed">
                    {Number(listing.price) / 1e18} ETH
                </Text>

            </Card.Section>

            <Group mt="xs">
                <Button radius="md" style={{ flex: 1 }}
                    onClick={async () => {
                        props.setLoading(true);
                        await purchaseListing(listing)
                        props.setLoading(false)
                    }}
                >
                    Purchase
                </Button>

            </Group>
        </Card>
    );
}

export default BadgeCard