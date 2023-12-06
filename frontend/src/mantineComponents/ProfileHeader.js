import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import {
    Container,
    Avatar,
    UnstyledButton,
    Group,
    Text,
    Menu,
    Tabs,
    Burger,
    rem,
    useMantineTheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
    IconLogout,
    IconHeart,
    IconStar,
    IconMessage,
    IconSettings,
    IconPlayerPause,
    IconTrash,
    IconSwitchHorizontal,
    IconChevronDown,
} from '@tabler/icons-react';
import { MantineLogo } from '@mantinex/mantine-logo';
import profileClasses from './ProfileHeader.module.css';

export function ProfileHeader() {
    const theme = useMantineTheme();
    const [opened, { toggle }] = useDisclosure(false);
    const [userMenuOpened, setUserMenuOpened] = useState(false);
    const [userAddress, setUserAddress] = useState('');
    const tabs = ['My Rights'];
    const user = {
    };

    const items = tabs.map((tab) => (
        <Tabs.Tab value={tab} key={tab}>
            {tab}
        </Tabs.Tab>
    ));

    // Function to fetch the user's address from MetaMask
    const fetchUserAddress = async () => {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const addresses = await provider.listAccounts();
            if (addresses.length > 0) {
                setUserAddress(addresses[0]);
            } else {
                console.log("Wallet is not connected");
            }
        } else {
            console.log("Please install MetaMask");
        }
    };
    // Listen for account changes
    useEffect(() => {
        if (window.ethereum) {
            window.ethereum.on("accountsChanged", (accounts) => {
                if (accounts.length > 0) {
                    setUserAddress(accounts[0]);
                } else {
                    setUserAddress('');
                }
            });
        }

        fetchUserAddress();
    }, []);


    return (
        <div className={profileClasses.header}>
            <Container className={profileClasses.mainSection} size="md">
                <Group justify="space-between">
                    <MantineLogo size={28} />

                    <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />

                    <Menu
                        width={260}
                        position="bottom-end"
                        transitionProps={{ transition: 'pop-top-right' }}
                        onClose={() => setUserMenuOpened(false)}
                        onOpen={() => setUserMenuOpened(true)}
                        withinPortal
                    >
                        <Menu.Target>
                            <UnstyledButton
                                className={`${profileClasses.user} ${userMenuOpened ? profileClasses.userActive : ''}`}
                            >
                                <Group gap={7}>
                                    <Avatar src={user.image} alt={userAddress} radius="xl" size={20} />
                                    <Text fw={500} size="sm" lh={1} mr={3}>
                                        {userAddress}
                                    </Text>
                                    <IconChevronDown style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
                                </Group>
                            </UnstyledButton>
                        </Menu.Target>
                        <Menu.Dropdown>
                            <Menu.Item
                                leftSection={
                                    <IconLogout style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                                }
                            >
                                Logout
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                </Group>
            </Container>
            <Container size="md">
                <Tabs
                    defaultValue="Home"
                    variant="outline"
                    visibleFrom="sm"
                    classNames={{
                        root: profileClasses.tabs,
                        list: profileClasses.tabsList,
                        tab: profileClasses.tab,
                    }}
                >
                    <Tabs.List>{items}</Tabs.List>
                </Tabs>
            </Container>
        </div>
    );
}