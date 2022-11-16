import { Container, Flex, Group, Text } from '@mantine/core'
import React, { useState } from 'react'
import { UserButton } from './UserButton';

export const LayoutHeader = () => {
    const [date] = useState(new Date());
    return (
        <Group position="apart" sx={{ height: '60px', backgroundColor: 'white', padding: '0 10px' }}>
            <Flex
                gap="sm"
                justify="flex-end"
                align="flex-start"
                direction="column"
                wrap="nowrap"
            >
                <Container sx={{ height: '20px' }} />
                <Text fz="sm">{date.toDateString()}</Text>
            </Flex>
            <UserButton />
        </Group>
    )
}
