import { Avatar, Group, UnstyledButton, Text, Tooltip } from '@mantine/core'
import { IconUser } from '@tabler/icons'
import React from 'react'

export const UserButton = () => {
    return (
        <Tooltip label={'Acciones de usuario'}>
            <UnstyledButton sx={{ backgroundColor: '#6096BA', padding: '5px', borderRadius: 10, height: 40 }}>
                <Group spacing={3}>
                    <IconUser />
                    <Text>Nombre</Text>
                </Group>
            </UnstyledButton>
        </Tooltip>
    )
}
