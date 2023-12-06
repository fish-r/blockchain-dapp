import { Avatar, Table, Group, Text, Button, Divider } from '@mantine/core';

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

export function MantineStack(props) {
    const { purchaseListing, getListings } = useEthers();
    const [isPurchasing, setLoading] = useState(true);

    // listing is array of arrays
    // convert each array into obj
    const objArr = props.listings?.map((each) => {
        return Object.assign({}, each)
    })
    const rows = objArr?.map((item) => (

        item.isForSale ?
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
                    <Text fz="xs" c="dimmed">
                        Email
                    </Text>
                </Table.Td>
                <Table.Td>
                    <Text fz="lg">{(Number(item.price) / 1e18).toFixed(3)}</Text>
                    <Text fz="xs" c="dimmed">
                        ETH
                    </Text>
                </Table.Td>

                <Table.Td>
                    <Group gap={0} justify="flex-start">
                        <Button onClick={() => {
                            purchaseListing(item)
                            setTimeout(() => {

                            }, 2000);
                        }}> Add to Cart</Button>
                    </Group>
                </Table.Td>
            </Table.Tr > : <></>
    ));



    return (
        <>
            <Table.ScrollContainer minWidth={800} p={20}>
                {!props.listings || false ?
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
export default MantineStack;