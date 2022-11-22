
import { AppShell, MantineProvider } from '@mantine/core'
import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { CustomNavbar } from './CustomNavbar'
import { LayoutHeader } from './LayoutHeader'
import SignIn from './SignIn';

export const Layout = ({ children }: { children: any }) => {
    const { user } = useAuth()
   
    return (
        <MantineProvider theme={{ colorScheme: 'light' }} withGlobalStyles withNormalizeCSS >
            {user ? (<AppShell navbar={<CustomNavbar />} padding={0} sx={{ backgroundColor: '#ECEFF4' }}>
                <LayoutHeader />
                {children}
            </AppShell>) : (<SignIn />)}
        </MantineProvider>
    )
}
