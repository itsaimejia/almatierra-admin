import { Avatar, Group, UnstyledButton, Text, Tooltip, Menu } from '@mantine/core'
import { IconHeart, IconLogout, IconMessage, IconPlayerPause, IconSettings, IconStar, IconSwitchHorizontal, IconTrash, IconUser } from '@tabler/icons'
import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';

export const UserButton = () => {
    const [userMenuOpened, setUserMenuOpened] = useState(false);
    const { user, logout } = useAuth()
    const router = useRouter()
    return (
        <Menu
            width={260}
            position="bottom-end"
            transition="pop-top-right"
            onClose={() => setUserMenuOpened(false)}
            onOpen={() => setUserMenuOpened(true)}
        >
            <Menu.Target>
                <Tooltip label={'Acciones de usuario'}>
                    <UnstyledButton sx={{ backgroundColor: '#6096BA', padding: '5px', borderRadius: 10, height: 40 }}>
                        <Group spacing={3}>
                            <IconUser />
                            <Text>{user.email}</Text>
                        </Group>
                    </UnstyledButton>
                </Tooltip>
            </Menu.Target>
            <Menu.Dropdown>


                <Menu.Label>Acciones usuario</Menu.Label>

                <Menu.Item icon={<IconLogout size={14} stroke={1.5} />} onClick={() => {
                    logout()
                    router.push('/')
                }}>Cerrar sesión</Menu.Item>


            </Menu.Dropdown>
        </Menu>

    )
}
