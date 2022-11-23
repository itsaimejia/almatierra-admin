import { ActionIcon, Alert, Box, Button, Flex, Grid, Group, Input, Modal, NativeSelect, Select, Stack, Text, Textarea, Notification } from '@mantine/core'
import { IconAlertCircle, IconCheck, IconX } from '@tabler/icons'
import React, { useEffect, useState } from 'react'
import { getFirst3Letter, getFirstLetterEachWord, isNotEmpty, normilizeWord } from '../static/onStrings'
import { addProduct } from '../pages/api/cymbals';


interface NewProductModalProps {
    children: any
    title: string
    opened: boolean
    closeModal(): void
}
export const FormBaseModal = ({ children, opened, title, closeModal }: NewProductModalProps) => {
    return (
        <>
            <Modal
                radius={10}
                padding={0}
                withCloseButton={false}
                centered
                size="sm"
                opened={opened}
                onClose={() => closeModal()}>
                <Stack>

                    <Box sx={{ borderTopRightRadius: 10, borderTopLeftRadius: 10, padding: 10, backgroundColor: '#BCD3F2', width: '100%', height: '45px' }}>
                        <Group position="apart">
                            <Text fw={500}>{title}</Text>
                            <ActionIcon variant="transparent" onClick={() => closeModal()}>
                                <IconX size={17} color='black' />
                            </ActionIcon>
                        </Group>
                    </Box>

                    <Stack sx={{ padding: 10 }}>
                        {children}
                    </Stack>
                </Stack>
            </Modal>
        </>
    );
}