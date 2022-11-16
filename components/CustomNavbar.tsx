import { useState } from 'react';
import { Navbar, Center, Tooltip, UnstyledButton, createStyles, Stack, SimpleGrid, Text, Image } from '@mantine/core';
import { useRouter } from 'next/router';

const useStyles = createStyles((theme) => ({
    link: {
        width: 70,
        height: 90,
        borderRadius: theme.radius.md,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'black',

        fontSize: 12,

        '&:hover': {
            opacity: 1,
            backgroundColor: '#90AACE',
        },
    },

    active: {
        opacity: 1,
        '&, &:hover': {
            backgroundColor: '#95B9EA',
        },
    },
}));

interface NavbarLinkProps {
    icon: string;
    label: string;
    tooltip?: string,
    active?: boolean;
    onClick?(): void;
}

function NavbarLink({ icon, label, tooltip, active, onClick }: NavbarLinkProps) {
    const { classes, cx } = useStyles();
    return (
        <Tooltip label={tooltip} position="right" transitionDuration={0}>
            <UnstyledButton onClick={onClick} className={cx(classes.link, { [classes.active]: active })}>
                <SimpleGrid cols={1} spacing="xs" verticalSpacing="xs">
                    <Center><Image alt='' src={`/${icon}.png`} width={30} height={30} /></Center>
                    <Text>{label}</Text>
                </SimpleGrid>
            </UnstyledButton>
        </Tooltip>
    );
}

const mockdata = [
    { icon: 'menuedit', tooltip: 'Administrar menú', label: 'Menú', route: '/' },
    { icon: 'imagesedit', tooltip: 'Administrar imágenes', label: 'Imágenes', route: '/images' },

];

export function CustomNavbar() {
    const router = useRouter()
    console.log(router.asPath)
    const [active, setActive] = useState(2);

    const links = mockdata.map((link) => (
        <NavbarLink
            {...link}
            key={link.label}
            active={router.asPath === link.route}
            onClick={() => router.push(link.route)}
        />
    ));

    return (
        <Navbar

            width={{ base: 100 }}
            height={'100%'}
            p="md"
            sx={{ backgroundColor: '#BCD3F2' }}
        >
            <Center>

            </Center>
            <Navbar.Section grow mt={50}>
                <Stack justify="center" spacing={10}>
                    {links}
                </Stack>
            </Navbar.Section>

        </Navbar>
    );
}
