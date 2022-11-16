import { Navbar, Stack } from '@mantine/core';
import { useRouter } from 'next/router';
import { CustomNavbarLink } from './CustomNavbarLink';

export function CustomNavbar() {
    const router = useRouter()
    return (
        <Navbar
            width={{ base: 100 }}
            height={'100%'}
            p="md"
            sx={{ backgroundColor: '#BCD3F2' }}>

            <Navbar.Section grow mt={50}>
                <Stack justify="center" spacing={10}>
                    <CustomNavbarLink
                        icon={'menuedit'} tooltip={'Administrar menú'} label={'Menú'}
                        active={router.asPath === '/'}
                        onClick={() => router.push('/')} />
                    <CustomNavbarLink
                        icon={'imagesedit'} tooltip={'Administrar imágenes'} label={'Imágenes'}
                        active={router.asPath === '/images'}
                        onClick={() => router.push('/images')} />
                </Stack>
            </Navbar.Section>

        </Navbar>
    );
}
