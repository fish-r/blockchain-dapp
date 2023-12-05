import { Avatar, Table, Group, Text, ActionIcon, Menu, rem, Center, Button } from '@mantine/core';
import {
    IconPencil,
    IconMessages,
    IconNote,
    IconReportAnalytics,
    IconTrash,
    IconDots,
} from '@tabler/icons-react';
import { Loader } from '@mantine/core';

const data = [
    {
        id: '1',
        image_url: "https://t4.ftcdn.net/jpg/00/10/33/17/360_F_10331779_PVOLBM8MIeDZW9H0vc3Cr0nLMoSEO8Le.jpg",
        artist: 'Artist ID',
        artist_name: 'Artist 1',
        current_owner: 'Current Owner Id',
        title: 'Album Title',
        price: '321',
        isForSale: true
    },
    {
        id: '1',
        image_url: "https://t4.ftcdn.net/jpg/00/10/33/17/360_F_10331779_PVOLBM8MIeDZW9H0vc3Cr0nLMoSEO8Le.jpg",
        artist: 'Artist ID',
        artist_name: 'Artist 1',
        current_owner: 'Current Owner Id',
        title: 'Album Title',
        price: '321',
        isForSale: true
    }
];


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
    console.log('MantineStack', props.isLoading)
    console.log('MantineStack listings', props.listings)

    const rows = data.map((item) => (

        <Table.Tr key={item.id}>
            <Table.Td>
                <Group gap="lg">
                    <Avatar size={40} src={item.image_url} radius={40} />
                    <div>
                        <Text fz="lg" fw={500}>
                            {item.artist_name}
                        </Text>
                        <Text c="dimmed" fz="xs">
                            {item.artist_name}
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
                <Text fz="lg">${Number(item.price).toFixed(1)}</Text>
                <Text fz="xs" c="dimmed">
                    ETH
                </Text>
            </Table.Td>

            <Table.Td>
                <Group gap={0} justify="flex-start">
                    <Button>Add to Cart</Button>
                    {/* <ActionIcon variant="subtle" color="gray">
                        <IconPencil style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                    </ActionIcon>
                    <Menu
                        transitionProps={{ transition: 'pop' }}
                        withArrow
                        position="bottom-end"
                        withinPortal
                    >
                        <Menu.Target>
                            <ActionIcon variant="subtle" color="gray">
                                <IconDots style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                            </ActionIcon>
                        </Menu.Target>
                        <Menu.Dropdown>
                            <Menu.Item
                                leftSection={
                                    <IconMessages style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                                }
                            >
                                Send message
                            </Menu.Item>
                            <Menu.Item
                                leftSection={<IconNote style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
                            >
                                Add note
                            </Menu.Item>
                            <Menu.Item
                                leftSection={
                                    <IconReportAnalytics style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                                }
                            >
                                Analytics
                            </Menu.Item>
                            <Menu.Item
                                leftSection={<IconTrash style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
                                color="red"
                            >
                                Terminate contract
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu> */}
                </Group>
            </Table.Td>
        </Table.Tr>
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