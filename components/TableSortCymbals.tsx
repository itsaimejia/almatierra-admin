import { useState } from 'react';
import {
    Table,
    Center,
    Button,
    ActionIcon,
    Flex,
    Paper,
} from '@mantine/core';
import { IconEdit, IconPower, IconTrash } from '@tabler/icons';
import { StatusFlag } from './StatusFlag';
import { turnOnOffProduct } from '../pages/api/cymbals';
import CymbalDescriptionModal from './CymbalDescriptionModal';
import { EditProductModal } from './EditProductModal';
import { DeleteProductModal } from './DeleteProductModal';
import { ProductProps } from '../classes/Products';

interface TableSortProps {
    data: ProductProps[];
    reloadDataCymbals(): void
}
export function TableSortCymbals({ data, reloadDataCymbals }: TableSortProps) {
    const [openedCymbalsDescriptionModal, setOpenedCymbalsDescriptionModal] = useState(false)
    const [openedEditProductModal, setOpenedEditProductModal] = useState(false)
    const [openedDeleteProductModal, setOpenedDeleteProductModal] = useState(false)
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

    const rows = data.map((data: any) => (
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
                    <ActionIcon onClick={() => {
                        setOpenedDeleteProductModal(true)
                        setCurrentDataCymbal(data)
                    }}>
                        <IconTrash size={19} color='black' />
                    </ActionIcon>

                    <ActionIcon onClick={() => {
                        turnOnOffProduct(data.id, data.status).then(() => {
                            reloadDataCymbals()
                        })
                    }}>
                        <IconPower size={19} color='black' />
                    </ActionIcon>
                </Flex>
            </td>
        </tr>
    ))
    return (
        <>
            <Paper shadow="lg" p="xs">
                <Table sx={{ backgroundColor: 'white', }} captionSide="bottom" striped withColumnBorders>
                    <thead>
                        {ths}
                    </thead>
                    <tbody>
                        {rows.length > 0 || data.length > 0 ? (
                            rows
                        ) : (
                            <tr>
                                <td colSpan={8}>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>

                <CymbalDescriptionModal opened={openedCymbalsDescriptionModal} setOpened={setOpenedCymbalsDescriptionModal} description={description} />
                <EditProductModal opened={openedEditProductModal} setOpened={setOpenedEditProductModal} dataCymbal={currentDataCymbal} reloadData={reloadDataCymbals} />
                <DeleteProductModal opened={openedDeleteProductModal} setOpened={setOpenedDeleteProductModal} dataCymbal={currentDataCymbal} reloadData={reloadDataCymbals} />
            </Paper>
        </>
    );
}