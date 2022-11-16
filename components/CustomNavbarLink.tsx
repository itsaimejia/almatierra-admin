import { Navbar, Center, Tooltip, UnstyledButton, createStyles, Stack, SimpleGrid, Text, Image } from '@mantine/core';
import React from 'react'

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

export const CustomNavbarLink = ({ icon, label, tooltip, active, onClick }: NavbarLinkProps) => {
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
