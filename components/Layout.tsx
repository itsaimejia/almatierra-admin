
import { AppShell, MantineProvider } from '@mantine/core'
import React from 'react'
import { CustomNavbar } from './CustomNavbar'
import { LayoutHeader } from './LayoutHeader'

export const Layout = ({ children }: { children: any }) => {
    return (
        <MantineProvider theme={{ colorScheme: 'light' }} withGlobalStyles withNormalizeCSS >
            <AppShell navbar={<CustomNavbar />} padding={0} sx={{ backgroundColor: '#ECEFF4' }}>
                <LayoutHeader />
                {children}
            </AppShell>
        </MantineProvider>
    )
}
