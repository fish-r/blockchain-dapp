/* eslint-disable jsx-a11y/anchor-is-valid */
import {
    HoverCard,
    Group,
    Button,
    UnstyledButton,
    Text,
    SimpleGrid,
    ThemeIcon,
    Anchor,
    Divider,
    Center,
    Box,
    Burger,
    Drawer,
    Collapse,
    ScrollArea,
    rem,
    useMantineTheme,
} from '@mantine/core';
import { MantineLogo } from '@mantinex/mantine-logo';
import { useDisclosure } from '@mantine/hooks';
import {
    IconNotification,
    IconCode,
    IconBook,
    IconChartPie3,

    IconFingerprint,
    IconCoin,
    IconChevronDown,
} from '@tabler/icons-react';
import classes from './HeaderMegaMenu.module.css';
import { useState } from 'react';
import { ethers } from "ethers";
import TokenArtifact from "../contracts/Token.json";
import contractAddress from "../contracts/contract-address.json";

const mockdata = [
    {
        icon: IconCode,
        title: 'Open source',
        description: 'This Pokémon’s cry is very loud and distracting',
    },
    {
        icon: IconCoin,
        title: 'Free for everyone',
        description: 'The fluid of Smeargle’s tail secretions changes',
    },
    {
        icon: IconBook,
        title: 'Documentation',
        description: 'Yanma is capable of seeing 360 degrees without',
    },
    {
        icon: IconFingerprint,
        title: 'Security',
        description: 'The shell’s rounded shape and the grooves on its.',
    },
    {
        icon: IconChartPie3,
        title: 'Analytics',
        description: 'This Pokémon uses its flying ability to quickly chase',
    },
    {
        icon: IconNotification,
        title: 'Notifications',
        description: 'Combusken battles with the intensely hot flames it spews',
    },
];


const initialState = {
    // The info of the token (i.e. It's Name and symbol)
    tokenData: undefined,
    // The user's address and balance
    selectedAddress: undefined,
    balance: undefined,
    // The ID about transactions being sent, and any possible error with them
    txBeingSent: undefined,
    transactionError: undefined,
    networkError: undefined,
};


export function HeaderMegaMenu() {
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
    const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
    const [loginState, setLoginState] = useState(initialState)
    const theme = useMantineTheme();
    const HARDHAT_NETWORK_ID = '1337';

    const connectWallet = async () => {
        const [selectedAddress] = await window.ethereum.request({ method: 'eth_requestAccounts' });
        checkNetwork();

        initialize(selectedAddress);

        // We reinitialize it whenever the user changes their account.
        window.ethereum.on("accountsChanged", ([newAddress]) => {
            stopPollingData();
            // `accountsChanged` event can be triggered with an undefined newAddress.
            // This happens when the user removes the Dapp from the "Connected
            // list of sites allowed access to your addresses" (Metamask > Settings > Connections)
            // To avoid errors, we reset the dapp state 
            if (newAddress === undefined) {
                return resetState();
            }

            initialize(newAddress);
        });
    }
    const initialize = async (userAddress) => {
        console.log('init', userAddress)
        setLoginState({ ...loginState, selectedAddress: userAddress })
        // poll for bal
        // Fetching the token data and the user's balance are specific to this
        // sample project, but you can reuse the same initialization pattern.
        const contract = await initializeEthers(userAddress);
        console.log('contract,', contract);
        const bal = await contract.name()
        console.log('bal', bal)
        // getTokenData(contract);
        // startPollingData(contract);
    }

    const initializeEthers = async (userAddress) => {
        // We first initialize ethers by creating a provider using window.ethereum
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        // Then, we initialize the contract using that provider and the token's
        // artifact. You can do this same thing with your contracts.
        const contract = new ethers.Contract(
            contractAddress.Token,
            TokenArtifact.abi,
            provider.getSigner(0)
        );
        return contract;
    }


    const startPollingData = (contract) => {
        setInterval(() => updateBalance(contract), 1000);
        updateBalance(contract);
    }

    const stopPollingData = () => {
        clearInterval();
    }


    const getTokenData = async (contract) => {
        const name = await contract.name();
        const symbol = await contract.symbol();

        setLoginState({ ...loginState, tokenData: { name, symbol } });
    }

    const updateBalance = async (contract) => {
        const balance = await contract.balanceOf(loginState.selectedAddress);
        setLoginState({ ...loginState, balance: balance })
    }

    // This method resets the state
    const resetState = () => {
        setLoginState(initialState);
    }

    const switchChain = async () => {
        const chainIdHex = `0x${HARDHAT_NETWORK_ID.toString(16)}`
        await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: chainIdHex }],
        });
        await initialize(loginState.selectedAddress);
    }

    // This method checks if the selected network is Localhost:8545
    const checkNetwork = async () => {
        if (window.ethereum.networkVersion !== HARDHAT_NETWORK_ID) {
            switchChain();
        }
    }


    const links = mockdata.map((item) => (
        <UnstyledButton className={classes.subLink} key={item.title}>
            <Group wrap="nowrap" align="flex-start">
                <ThemeIcon size={34} variant="default" radius="md">
                    <item.icon style={{ width: rem(22), height: rem(22) }} color={theme.colors.blue[6]} />
                </ThemeIcon>
                <div>
                    <Text size="sm" fw={500}>
                        {item.title}
                    </Text>
                    <Text size="xs" c="dimmed">
                        {item.description}
                    </Text>
                </div>
            </Group>
        </UnstyledButton>
    ));

    return (
        <Box pb={20} pt={20}>
            <header className={classes.header}>
                <Group justify="space-between" h="100%">
                    <MantineLogo size={30} />

                    <Group h="100%" gap={0} visibleFrom="sm">
                        <a href="#" className={classes.link}>
                            Home
                        </a>
                        <HoverCard width={600} position="bottom" radius="md" shadow="md" withinPortal>
                            <HoverCard.Target>
                                <a href="#" className={classes.link}>
                                    <Center inline>
                                        <Box component="span" mr={5}>
                                            Features
                                        </Box>
                                        <IconChevronDown
                                            style={{ width: rem(16), height: rem(16) }}
                                            color={theme.colors.blue[6]}
                                        />
                                    </Center>
                                </a>
                            </HoverCard.Target>

                            <HoverCard.Dropdown style={{ overflow: 'hidden' }}>
                                <Group justify="space-between" px="md">
                                    <Text fw={500}>Features</Text>
                                    <Anchor href="#" fz="xs">
                                        View all
                                    </Anchor>
                                </Group>

                                <Divider my="sm" />

                                <SimpleGrid cols={2} spacing={0}>
                                    {links}
                                </SimpleGrid>

                                <div className={classes.dropdownFooter}>
                                    <Group justify="space-between">
                                        <div>
                                            <Text fw={500} fz="sm">
                                                Get started
                                            </Text>
                                            <Text size="xs" c="dimmed">
                                                Their food sources have decreased, and their numbers
                                            </Text>
                                        </div>
                                        <Button variant="default">Get started</Button>
                                    </Group>
                                </div>
                            </HoverCard.Dropdown>
                        </HoverCard>
                        <a href="#" className={classes.link}>
                            Learn
                        </a>
                        <a href="#" className={classes.link}>
                            Academy
                        </a>
                    </Group>

                    <Group visibleFrom="sm">
                        {loginState.selectedAddress ?

                            <Button id={loginState} variant='default' onClick={() => initialize(loginState.selectedAddress)}>Profile</Button>

                            : <Button id={loginState} variant="default" onClick={() => {
                                connectWallet()
                            }}>Log in</Button>}
                        <Button onClick={() => { console.log('stuff', loginState) }}>My Cart</Button>
                    </Group>

                    <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
                </Group>
            </header>

            <Drawer
                opened={drawerOpened}
                onClose={closeDrawer}
                size="100%"
                padding="md"
                title="Navigation"
                hiddenFrom="sm"
                zIndex={1000000}
            >
                <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
                    <Divider my="sm" />

                    <a href="#" className={classes.link}>
                        Home
                    </a>
                    <UnstyledButton className={classes.link} onClick={toggleLinks}>
                        <Center inline>
                            <Box component="span" mr={5}>
                                Features
                            </Box>
                            <IconChevronDown
                                style={{ width: rem(16), height: rem(16) }}
                                color={theme.colors.blue[6]}
                            />
                        </Center>
                    </UnstyledButton>
                    <Collapse in={linksOpened}>{links}</Collapse>
                    <a href="#" className={classes.link}>
                        Learn
                    </a>
                    <a href="#" className={classes.link}>
                        Academy
                    </a>

                    <Divider my="sm" />

                    <Group justify="center" grow pb="xl" px="md">
                        <Button variant="default">Log in</Button>
                        <Button>Sign up</Button>
                    </Group>
                </ScrollArea>
            </Drawer>
        </Box>
    );
}
