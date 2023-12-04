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
    var token;


    const connectWallet = async () => {
        console.log('conn')
        const [selectedAddress] = await window.ethereum.request({ method: 'eth_requestAccounts' });
        console.log('selected addr', selectedAddress)
        // Once we have the address, we can initialize the application.

        // First we check the network
        // this._checkNetwork();

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
    const initialize = (userAddress) => {
        console.log('init', userAddress)
        // We first store the user's address in the component's state

        setLoginState({ ...loginState, selectedAddress: userAddress })

        // Then, we initialize ethers, fetch the token's data, and start polling
        // for the user's balance.

        // Fetching the token data and the user's balance are specific to this
        // sample project, but you can reuse the same initialization pattern.
        initializeEthers();
        getTokenData();
        startPollingData();
    }

    const initializeEthers = async () => {
        // We first initialize ethers by creating a provider using window.ethereum
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        // Then, we initialize the contract using that provider and the token's
        // artifact. You can do this same thing with your contracts.
        token = new ethers.Contract(
            contractAddress.Token,
            TokenArtifact.abi,
            provider.getSigner(0)
        );

        console.log('token', token)
    }


    const startPollingData = () => {
        const pollDataInterval = setInterval(() => this._updateBalance(), 1000);
        updateBalance();
    }

    const stopPollingData = () => {
        clearInterval(this._pollDataInterval);
        const pollDataInterval = undefined;
    }


    const getTokenData = async () => {
        const name = await this._token.name();
        const symbol = await this._token.symbol();

        setLoginState({ ...loginState, tokenData: { name, symbol } });
    }

    const updateBalance = async () => {
        const balance = await this._token.balanceOf(this.state.selectedAddress);
        this.setState({ balance });
    }

    // This method resets the state
    const resetState = () => {
        setLoginState(initialState);
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

                            <Button id={loginState} variant='default' onClick={() => { window.alert(JSON.stringify(loginState)) }}>Profile</Button>

                            : <Button id={loginState} variant="default" onClick={() => {
                                console.log('Log in')
                                connectWallet()
                            }}>Log in</Button>}
                        <Button onClick={() => { console.log(loginState) }}>My Cart</Button>
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
