import { ActionIcon, Button, Center, Flex, Paper, Table } from '@mantine/core';
import { IconUser, IconEdit, IconTrash, IconPower } from '@tabler/icons'
import { reload } from 'firebase/auth';
import React, { useState } from 'react'
import { turnOnOffProduct } from '../pages/api/cymbals';
import CymbalDescriptionModal from './CymbalDescriptionModal';
import { EditProductModal } from './EditProductModal';
import { StatusFlag } from './StatusFlag';



export const CymbalsTable = ({ dataTable, reloadData }: { dataTable: any, reloadData: any }) => {

    const [openedCymbalsDescriptionModal, setOpenedCymbalsDescriptionModal] = useState(false)
    const [openedEditProductModal, setOpenedEditProductModal] = useState(false)
    const [description, setDescription] = useState('')
    const [currentDataCymbal, setCurrentDataCymbal] = useState(Object)

    const ths = (
        <tr>
            <th>ID</th>
            <th>NOMBRE</th>
            <th>MENÚ</th>
            <th>CATEGORÍA</th>
            <th>DESCRIPCIÓN</th>
            <th>PRECIO</th>
            <th>ESTADO</th>
            <th>ACCIONES</th>
        </tr>
    )
    const rows = dataTable.map((data: any) => (
        <tr key={data.id}>
            <td>{data.id}</td>
            <td>{data.name}</td>
            <td>{data.menu}</td>
            <td>{data.categorie}</td>
            <td>
                <Center>
                    <Button sx={{ backgroundColor: '#6096BA' }} radius="md" size="xs"
                        onClick={() => {
                            setOpenedCymbalsDescriptionModal(true)
                            setDescription(data.description)
                        }}>
                        Ver descripción
                    </Button>
                </Center>
            </td>
            <td>${data.price}</td>
            <td><StatusFlag status={data.status} /></td>
            <td>
                <Flex
                    gap="md"
                    justify="center"
                    align="center"
                    direction="row">
                    <ActionIcon onClick={() => {
                        setOpenedEditProductModal(true)
                        setCurrentDataCymbal(data)
                    }}>
                        <IconEdit size={19} color='black' />
                    </ActionIcon>
                    <IconTrash size={19} />
                    {/* <ActionIcon onClick={() => turnOnOffProduct(data.id, data.status, reloadData)}>
                        <IconPower size={19} color='black' />
                    </ActionIcon> */}
                </Flex>
            </td>
        </tr>
    ))

    return (
        <Paper shadow="lg" p="xs">
            <Table sx={{ backgroundColor: 'white', }} captionSide="bottom" striped withColumnBorders>
                <thead>{ths}</thead>
                <tbody>{rows}</tbody>

            </Table>
            <CymbalDescriptionModal opened={openedCymbalsDescriptionModal} setOpened={setOpenedCymbalsDescriptionModal} description={description} />
            <EditProductModal opened={openedEditProductModal} setOpened={setOpenedEditProductModal} dataCymbal={currentDataCymbal} reloadData={reloadData} />
        </Paper>
    );

}
