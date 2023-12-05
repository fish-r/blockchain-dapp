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
    useMantineTheme,
} from '@mantine/core';
import { MantineLogo } from '@mantinex/mantine-logo';
import { useDisclosure } from '@mantine/hooks';

import classes from './HeaderMegaMenu.module.css';
import { useState } from 'react';



export function HeaderMegaMenu(connectWallet) {
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
    const [loginState, setLoginState] = useState(undefined)



    return (
        <Box pb={20} pt={20}>
            <header className={classes.header}>
                <Group justify="space-between" h="100%">
                    <MantineLogo size={30} />

                    <Group visibleFrom="sm">
                        {loginState ?

                            <Button id={loginState} variant='default' onClick={() => { console.log(loginState) }}>Profile</Button>

                            : <Button id={loginState} variant="default" onClick={async () => {
                                const addr = await connectWallet.connectWallet()
                                setLoginState(addr)
                                console.log(addr)
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

                    <Group justify="center" grow pb="xl" px="md">
                        <Button variant="default">Log in</Button>
                        <Button>Sign up</Button>
                    </Group>
                </ScrollArea>
            </Drawer>
        </Box>
    );
}
