import { Avatar, Table, Group, Text, Button } from '@mantine/core';

import { Loader } from '@mantine/core';


const Loading = () => {
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

    // listing is array of arrays
    // convert each array into obj
    const objArr = props.listings.map((each) => {
        return Object.assign({}, each)
    })

    const purchase = async (listingId) => {
        console.log('contract', props.contract)
        const contract = props.contract;
        try {
            const result = await contract.buyMusicCopyright(listingId)
            console.log(result)
        } catch (error) {
            console.log(error)
        }
    }

    const rows = objArr.map((item) => (

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
                        <Button onClick={() => { purchase(item.id) }}> Add to Cart</Button>
                    </Group>
                </Table.Td>
            </Table.Tr > : <></>
    ));


    return (
        <>
            <Table.ScrollContainer minWidth={800} p={20}>
                {props.isLoading ?
                    <Loading></Loading> :
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