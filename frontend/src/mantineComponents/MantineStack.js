import { Avatar, Table, Group, Text, ActionIcon, Menu, rem, Center } from '@mantine/core';
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
        avatar:
            'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png',
        name: 'Robert Wolfkisser',
        job: 'Engineer',
        email: 'rob_wolf@gmail.com',
        rate: 22,
    },
    {
        avatar:
            'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-5.png',
        name: 'Jill Jailbreaker',
        job: 'Engineer',
        email: 'jj@breaker.com',
        rate: 45,
    },
    {
        avatar:
            'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-3.png',
        name: 'Henry Silkeater',
        job: 'Designer',
        email: 'henry@silkeater.io',
        rate: 76,
    },
    {
        avatar:
            'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-3.png',
        name: 'Bill Horsefighter',
        job: 'Designer',
        email: 'bhorsefighter@gmail.com',
        rate: 15,
    },
    {
        avatar:
            'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png',
        name: 'Jeremy Footviewer',
        job: 'Manager',
        email: 'jeremy@foot.dev',
        rate: 98,
    },
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

        <Table.Tr key={item.name}>
            <Table.Td>
                <Group gap="sm">
                    <Avatar size={40} src={item.avatar} radius={40} />
                    <div>
                        <Text fz="sm" fw={500}>
                            {item.name}
                        </Text>
                        <Text c="dimmed" fz="xs">
                            {item.job}
                        </Text>
                    </div>
                </Group>
            </Table.Td>
            <Table.Td>
                <Text fz="sm">{item.email}</Text>
                <Text fz="xs" c="dimmed">
                    Email
                </Text>
            </Table.Td>
            <Table.Td>
                <Text fz="sm">${item.rate.toFixed(1)} / hr</Text>
                <Text fz="xs" c="dimmed">
                    Rate
                </Text>
            </Table.Td>
            <Table.Td>
                <Group gap={0} justify="flex-end">
                    <ActionIcon variant="subtle" color="gray">
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
                    </Menu>
                </Group>
            </Table.Td>
        </Table.Tr>
    ));


    return (
        <>
            <Table.ScrollContainer minWidth={800} p={20}>
                {props.isLoading ?
                    <Loading></Loading> :
                    <Table verticalSpacing="md">

                        <Table.Th>Artist</Table.Th>
                        <Table.Th>Album</Table.Th>
                        <Table.Th>Floor Price</Table.Th>

                        <Table.Tbody>{rows}</Table.Tbody>
                    </Table>
                }
            </Table.ScrollContainer>
        </>

    );
}
export default MantineStack;