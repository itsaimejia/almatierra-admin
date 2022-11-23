import { Alert, Button, Flex, Grid, Group, Input, Text, Textarea, Notification, Stack, Center } from '@mantine/core'
import { IconAlertCircle, IconCheck } from '@tabler/icons'
import React, { useEffect, useState } from 'react'
import { isNotEmpty } from '../static/onStrings'
import { editProduct, deleteProduct } from '../pages/api/cymbals';
import { FormBaseModal } from './FormBaseModal';

interface ProductModalProps {
    opened: boolean
    setOpened: any
    dataCymbal: any
    reloadData(): void
}
export const DeleteProductModal = ({ opened, setOpened, dataCymbal, reloadData }: ProductModalProps) => {

    const [showErrorMessage, setShowErrorMessage] = useState(false)
    const [showNotification, setShowNotification] = useState(false)
    const [loading, setLoading] = useState(false)
    const [menu, setMenu] = useState('')
    const [categorie, setCategorie] = useState('')
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [inputId, setInputId] = useState('')

    const closeModal = () => {
        setOpened(false)
        setInputId('')
        setLoading(false)
        setShowNotification(false)
    }

    useEffect(() => {
        setName(dataCymbal.name)
        setPrice(dataCymbal.price)
        setMenu(dataCymbal.menu)
        setCategorie(dataCymbal.categorie)
    }, [dataCymbal.categorie, dataCymbal.menu, dataCymbal.name, dataCymbal.price])
    const inputIdValid = inputId === dataCymbal.id
    const handleEditProduct = async () => {
        const valid = inputIdValid
        if (valid) {
            setShowNotification(true)
            setLoading(true)
            deleteProduct(inputId).then((v) => {
                setLoading(false)
                setTimeout(() => closeModal(), 500)
                reloadData()
            })

        }
    }

    return (
        <FormBaseModal title={'Eliminar producto'} opened={opened} closeModal={closeModal} >
            <Flex
                justify="center"
                align="center"
            >
                Eliminar: <Text color={'red'} weight='bold'> {dataCymbal.id}</Text>
            </Flex>
            <Center>
                <Stack>
                    <Group>
                        <Text>Menú: {menu}</Text>
                        <Text>Categoria: {categorie} </Text>
                    </Group>
                    <Group>
                        <Text>Nombre: {name}</Text>
                        <Text>Precio: {price}</Text>
                    </Group>

                </Stack>
            </Center>
            <Input.Wrapper label={`Escribe el ID: ${dataCymbal.id} para confirmar`} required>
                <Input placeholder={dataCymbal.id}
                    value={inputId}
                    onChange={(event: any) => setInputId(event.currentTarget.value)} />
            </Input.Wrapper>
            {showNotification ? (<Notification loading={loading} icon={<IconCheck size={18} />} color="teal" title="Guardar">
                {loading ? 'Guardando cambios' : 'Cambios guardados'}
            </Notification>) : null}
            <Flex
                justify="center"
                align="center"
            >
                <Button size="xs"
                    styles={(theme) => ({
                        root: {
                            backgroundColor: '#B6151B',
                            '&:hover': {
                                backgroundColor: theme.fn.darken('#B6151B', 0.05),
                            },
                        },
                    })}
                    disabled={!inputIdValid}
                    onClick={() => handleEditProduct()}>Eliminar</Button>
            </Flex>
        </FormBaseModal>

    );
}
