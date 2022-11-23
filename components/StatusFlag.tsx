import { Flex, Text } from '@mantine/core'
import React from 'react'

export const StatusFlag = ({ status }: { status: string }) => {
    return (
        <Flex
            p={8}
            justify="center"
            align="center"
            sx={{ backgroundColor: status === 'active' ? '#47A025' : '#FF9F1C' }}
        >
            <Text>{status === 'active' ? 'Activo' : 'Inactivo'}</Text>
        </Flex>
    )
}
