import { Avatar, Table, Group, Text, Button } from '@mantine/core';

import { Loader } from '@mantine/core';
import useEthers from '../hooks/useEthers';
import { useState } from 'react';


const LoadingComponent = () => {
    return (
        <>
            <Table verticalSpacing="md">
                <Table.Th>Artist</Table.Th>
                <Table.Th>Album</Table.Th>
                <Table.Th>Floor Price</Table.Th>
                <Table.Th>Action</Table.Th>
                <Table.Tr>
                    <Table.Td>
                        <Loader color="blue" size="md" type="dots" />
                    </Table.Td>
                    <Table.Td>
                        <Loader color="blue" size="md" type="dots" />
                    </Table.Td>
                    <Table.Td>
                        <Loader color="blue" size="md" type="dots" />
                    </Table.Td>
                    <Table.Td>
                        <Loader color="blue" size="md" type="dots" />
                    </Table.Td>
                </Table.Tr>
                <Table.Tr>
                    <Table.Td>
                        <Loader color="blue" size="md" type="dots" />
                    </Table.Td>
                    <Table.Td>
                        <Loader color="blue" size="md" type="dots" />
                    </Table.Td>
                    <Table.Td>
                        <Loader color="blue" size="md" type="dots" />
                    </Table.Td>
                    <Table.Td>
                        <Loader color="blue" size="md" type="dots" />
                    </Table.Td>
                </Table.Tr>  <Table.Tr>
                    <Table.Td>
                        <Loader color="blue" size="md" type="dots" />
                    </Table.Td>
                    <Table.Td>
                        <Loader color="blue" size="md" type="dots" />
                    </Table.Td>
                    <Table.Td>
                        <Loader color="blue" size="md" type="dots" />
                    </Table.Td>
                    <Table.Td>
                        <Loader color="blue" size="md" type="dots" />
                    </Table.Td>
                </Table.Tr>
            </Table>
        </>
    )
}

export function ProfileStack(props) {
    const { listOnMarket, getListings, connectWallet, data } = useEthers();
    const [loading, setLoading] = useState(false);
    const objArr = props.listings;

    const ListAction = (props) => {
        const listing = props.listing
        if (loading) return <>
            <Loader color="blue" size="md" type="dots" />
        </>
        else if (listing.isForSale) return <>
            <Button onClick={async () => {
                await connectWallet();
                setLoading(true);
                // unlist
                // await purchaseListing(item)
                await getListings();
                setLoading(false)
            }}> Unlist from Marketplace</Button>
        </>
        else return <>
            <Button onClick={async () => {
                await connectWallet();
                setLoading(true);
                await listOnMarket(listing, 200)
                await getListings();
                setLoading(false)
            }}> List For Sale</Button>
        </>
    }


    const rows = objArr?.map((item) => (
        <Table.Tr key={item.id} >
            <Table.Td>
                <Group gap="lg">
                    <Avatar size={40} src={item.image_url} radius={40} />
                    <div>
                        <Text fz="lg" fw={500}>
                            {item.artist_name}
                        </Text>
                        <Text c="dimmed" fz="xs">
                            {item.current_owner}
                        </Text>
                    </div>
                </Group>
            </Table.Td>
            <Table.Td>
                <Text fz="lg">{item.title}</Text>

            </Table.Td>
            <Table.Td>
                <Text fz="lg">{(Number(item.price) / 1e18).toFixed(3)}</Text>
                <Text fz="xs" c="dimmed">
                    ETH
                </Text>
            </Table.Td>

            <Table.Td>
                <Group gap={0} justify="flex-start">
                    <ListAction listing={item}></ListAction>

                </Group>
            </Table.Td>
        </Table.Tr >
    ));




    return (
        <>
            <Table.ScrollContainer minWidth={800} p={20}>
                <Text fz="xl" fw={500}>My Copyrights</Text>
                {!props.listings.length === 0 ?
                    <LoadingComponent /> :
                    <Table verticalSpacing="lg">

                        <Table.Th>Artist</Table.Th>
                        <Table.Th>Album</Table.Th>
                        <Table.Th>Price</Table.Th>
                        <Table.Th>Action</Table.Th>

                        <Table.Tbody>{rows}</Table.Tbody>
                    </Table>
                }

            </Table.ScrollContainer>
        </>

    );
}
export default ProfileStack;