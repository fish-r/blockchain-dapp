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
} from '@mantine/core';
import { MantineLogo } from '@mantinex/mantine-logo';
import { useDisclosure } from '@mantine/hooks';

import classes from './HeaderMegaMenu.module.css';

import useEthers from "../hooks/useEthers"
import { useNavigate } from 'react-router-dom';


export function HeaderMegaMenu() {
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
    const { connectWallet, data } = useEthers();
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
                        {data.selectedAddress ?

                            <Button id={data.selectedAddress} variant='default' onClick={() => { navigateToProfile() }}>Profile</Button>
                            : <Button id={data.selectedAddress} variant="default" onClick={async () => {
                                await connectWallet();
                            }}>Log in</Button>}
                        <Button onClick={() => { console.log('stuff', data) }}>My Cart</Button>
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
