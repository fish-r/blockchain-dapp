/* eslint-disable jsx-a11y/anchor-is-valid */
import {
    Group,
    Button,
    Divider,
    Box,
    Burger,
    Drawer,
    ScrollArea,
    rem,
    Text,
    Avatar
} from '@mantine/core';
import { MantineLogo } from '@mantinex/mantine-logo';
import { useDisclosure } from '@mantine/hooks';

import classes from './HeaderMegaMenu.module.css';

import useEthers from "../hooks/useEthers"
import { useNavigate } from 'react-router-dom';


export function HeaderMegaMenu(props) {
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
    const { connectWallet } = useEthers();
    const navigate = useNavigate();
    const navigateToProfile = () => {
        navigate('/profile');
    };



    return (
        <Box pb={20} pt={20}>
            <header className={classes.header}>
                <Group justify="space-between" h="100%">
                    <MantineLogo size={30} />

                    <Group visibleFrom="sm">
                        {props.selectedAddress ?
                            <>
                                <Group>
                                    <Avatar src={props.selectedAddress.image} alt={props.selectedAddress} radius="xl" />
                                    <Text fw={500} size="sm" lh={2} mr={3}>
                                        {props.selectedAddress}
                                    </Text>
                                </Group>
                                <Button variant='default' onClick={() => { navigateToProfile() }}>Profile</Button>
                            </>
                            : <Button variant="default" onClick={async () => {
                                await connectWallet();
                            }}>Log in</Button>}
                        <Button onClick={() => { console.log('stuff') }}>Notifications</Button>
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

                    <Group justify="center" grow pb="xl" px="md">
                        <Button variant="default">Log in</Button>
                        <Button>Sign up</Button>
                    </Group>
                </ScrollArea>
            </Drawer>
        </Box>
    );
}
