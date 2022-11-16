import { Stack, Title } from '@mantine/core'
import React from 'react'

export const LayoutBody = ({ children, titlePage }: { children: any, titlePage: string }) => {
    return (
        <Stack sx={{ margin: 10 }}>
            <Title>{titlePage}</Title>
            {children}
        </Stack>
    )
}
