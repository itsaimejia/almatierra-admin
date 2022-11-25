import { useState } from 'react';
import {
    Table,
    Group,
    Text,
    Center,
    TextInput,
    Button,
    ActionIcon,
    Flex,
    Paper,
} from '@mantine/core';
import { keys } from '@mantine/utils';
import { IconSearch, IconEdit, IconPower, IconTrash, IconPlus } from '@tabler/icons';
import { StatusFlag } from './StatusFlag';
import { turnOnOffProduct } from '../pages/api/cymbals';
import { NewProductModal } from './NewProductModal';
import CymbalDescriptionModal from './CymbalDescriptionModal';
import { EditProductModal } from './EditProductModal';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../config/firebase';
import { DeleteProductModal } from './DeleteProductModal';



interface ProductProps {
    id: string
    menu: string
    categorie: string
    name: string
    description: string
    price: string
}

interface TableSortProps {
    data: ProductProps[];
}

function filterData(data: ProductProps[], search: string) {
    const query = search.toLowerCase().trim()
    return data.filter((item) => keys(data[0]).some((key) => item[key].toString().toLowerCase().includes(query)));
}

function sortData(data: ProductProps[], payload: { search: string }) {
    return filterData(
        [...data],
        payload.search
    )
}

export function TableSortCymbals({ data }: TableSortProps) {
    const [search, setSearch] = useState('');
    const [sortedData, setSortedData] = useState(data);
    const [openedCymbalsDescriptionModal, setOpenedCymbalsDescriptionModal] = useState(false)
    const [openedEditProductModal, setOpenedEditProductModal] = useState(false)
    const [openedNewProductModal, setOpenedNewProductModal] = useState(false)
    const [openedDeleteProductModal, setOpenedDeleteProductModal] = useState(false)
    const [description, setDescription] = useState('')
    const [currentDataCymbal, setCurrentDataCymbal] = useState(Object)
    const [currentDataCymbals, setCurrentDataCymbals] = useState(data)

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.currentTarget;
        setSearch(value);
        setSortedData(sortData(currentDataCymbals, { search: value }));
    }
    async function reloadDataCymbals() {
        const querySnapshot = await getDocs(collection(db, "cymbals"))
        let cymbals: any = []
        querySnapshot.forEach((doc) => {
            const newObject = {
                id: doc.id,
                menu: doc.data().menu,
                categorie: doc.data().categorie,
                name: doc.data().name,
                description: doc.data().description,
                price: doc.data().price,
                status: doc.data().status
            }
            cymbals.push(newObject)
        })
        const sortCymbals = cymbals.sort((a: any, b: any) => parseInt(b.id.slice(-4)) - parseInt(a.id.slice(-4)))
        setSortedData(sortData(sortCymbals, { search }))
        setCurrentDataCymbals(sortCymbals)
    }

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

    const rows = sortedData.map((data: any) => (
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
            <NewProductModal opened={openedNewProductModal} setOpened={setOpenedNewProductModal} dataCymbals={currentDataCymbals} reloadData={reloadDataCymbals} />
            <Group position='apart'>
                <Flex
                    gap="xs"
                    justify="flex-start"
                    align="flex-start"
                    direction="row"
                    wrap="nowrap"
                >
                    <Button
                        styles={(theme) => ({
                            root: {
                                backgroundColor: '#47A025',
                                color: 'black',
                                '&:hover': {
                                    backgroundColor: theme.fn.darken('#47A025', 0.05),
                                },
                            },
                        })}
                        leftIcon={<IconPlus size={17} />}
                        onClick={() => setOpenedNewProductModal(true)}>
                        Nuevo producto</Button>
                    <TextInput
                        sx={{ width: 300 }}
                        placeholder="Buscar por ID, Nombre, Menú, Categoría"
                        mb="md"
                        icon={<IconSearch size={14} stroke={1.5} />}
                        value={search}
                        onChange={handleSearchChange}
                    />
                </Flex>
                <Button disabled >Editar menus</Button>
            </Group>
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