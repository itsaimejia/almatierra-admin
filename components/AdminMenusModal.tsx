import { Modal, Stack, Box, Group, ActionIcon, Text, Paper, Table, Button, Center, Flex, Tabs, Input, List, ScrollArea, Divider } from '@mantine/core';
import { IconEdit, IconPhoto, IconPower, IconTrash, IconX, IconPlus } from '@tabler/icons';
import { title } from 'process';
import React, { useState } from 'react'
import { turnOnOffProduct } from '../pages/api/cymbals';
import { EditProductModal } from './EditProductModal';
import { FormBaseModal } from './FormBaseModal';
import { NewMenuForm } from './NewMenuForm';
import { StatusFlag } from './StatusFlag';

interface AdminMenusModalProps {
    opened: boolean
    setOpened: any
    // dataCymbals: Array<any>
    // reloadData(): void
}
export const AdminMenusModal = ({ opened, setOpened }: AdminMenusModalProps) => {
    const ths = (
        <tr>
            <th>ID</th>
            <th>NOMBRE</th>
            <th>CATEGORÍAS</th>
            <th>ESTADO</th>
            <th>I/O</th>
        </tr>
    )

    const rows = [{ id: 'aaa' }, { id: 'aaa' }, { id: 'aaa' },].map((data: any) => (
        <tr key={data.id}>
            <td>{'ID'}</td>
            <td>{'NOMBRE'}</td>
            <td> <List
                spacing="xs"
                size="sm">
                {['sajdaskld', 'asdadasd', 'asdasdasd'].map((a: any, i: number) => (<List.Item key={i}>{a}</List.Item>))}
            </List></td>
            <td><StatusFlag status={data.status} /></td>
            <td>
                <Flex
                    gap="md"
                    justify="center"
                    align="center"
                    direction="row">

                    <ActionIcon onClick={() => {
                    }}>
                        <IconPower size={19} color='black' />
                    </ActionIcon>
                </Flex>
            </td>
        </tr>
    ))
    const closeModal = () => {
        setOpened(false)
    }
    return (
        <FormBaseModal size={700} title={'Editar menús'} opened={opened} closeModal={closeModal}>
            <Tabs defaultValue="add">
                <Tabs.List>
                    <Tabs.Tab value="add" icon={<IconPlus size={14} />}>Agregar menú</Tabs.Tab>
                    <Tabs.Tab value="edit" icon={<IconEdit size={14} />}>Editar menú</Tabs.Tab>
                    <Tabs.Tab value="delete" icon={<IconTrash size={14} />}>Eliminar menú</Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value="add" pt="xs">
                    <NewMenuForm />
                </Tabs.Panel>
                <Tabs.Panel value="edit" pt="xs">
                    Gallery tab content
                </Tabs.Panel>
                <Tabs.Panel value="delete" pt="xs">
                    Messages tab content
                </Tabs.Panel>
            </Tabs>
            <Divider />
            <Stack>
                <Paper shadow="lg" p={0}>
                    <ScrollArea style={{ height: 250 }}>
                        <Table verticalSpacing="xs" fontSize="xs" sx={{ fontSize: 10, backgroundColor: 'white', }} captionSide="bottom" striped withColumnBorders>
                            <thead>
                                {ths}
                            </thead>
                            <tbody>
                                {rows.length > 0 || [].length > 0 ? (
                                    rows
                                ) : (
                                    <tr>
                                        <td colSpan={8}>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </ScrollArea>
                </Paper>
            </Stack>
        </FormBaseModal>
    )
}
