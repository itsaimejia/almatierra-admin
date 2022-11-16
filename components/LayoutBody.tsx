import { Stack } from '@mantine/core'
import React from 'react'

export const LayoutBody = ({ children }: { children: any }) => {
    return (
        <Stack sx={{ margin: 10 }}>
            {children}
        </Stack>
    )
}
