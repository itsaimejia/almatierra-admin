import { ActionIcon, Alert, Box, Button, Flex, Grid, Group, Input, Modal, NativeSelect, Select, Stack, Text, Textarea, Notification } from '@mantine/core'
import { IconAlertCircle, IconCheck, IconX } from '@tabler/icons'
import React, { useEffect, useState } from 'react'
import { getFirst3Letter, getFirstLetterEachWord, isNotEmpty, normilizeWord } from '../static/onStrings'
import { addProduct, editProduct } from '../pages/api/cymbals';
import { FormBaseModal } from './FormBaseModal';


interface NewProductModalProps {
    opened: boolean
    setOpened: any
    dataCymbal: any
    reloadData(): void
}
export const EditProductModal = ({ opened, setOpened, dataCymbal, reloadData }: NewProductModalProps) => {

    const [showErrorMessage, setShowErrorMessage] = useState(false)
    const [showNotification, setShowNotification] = useState(false)
    const [loading, setLoading] = useState(false)

    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')



    const closeModal = () => {
        setOpened(false)
        setShowErrorMessage(false)
    }

    useEffect(() => {
        setName(dataCymbal.name)
        setPrice(dataCymbal.price)
        setDescription(dataCymbal.description)
    }, [dataCymbal.description, dataCymbal.name, dataCymbal.price])

    const handleEditProduct = async () => {
        const valid = isNotEmpty(name) && isNotEmpty(price)
        setShowErrorMessage(!valid)
        if (valid) {
            setShowNotification(true)
            setLoading(true)

            editProduct({
                id: dataCymbal.id,
                menu: dataCymbal.menu,
                categorie: dataCymbal.categorie,
                description: description,
                name: name,
                price: price
            }).then((v) => {
                setLoading(false)
                setTimeout(() => setShowNotification(false), 5000)
                closeModal()
                reloadData()
            })

        }
    }
    return (
        <FormBaseModal title={'Agregar nuevo producto'} opened={opened} closeModal={closeModal} >
            <Flex
                justify="center"
                align="center"
            >
                <Text>Editando: {dataCymbal.id}</Text>
            </Flex>
            <Group grow>
                <Input
                    value={dataCymbal.menu}
                    disabled
                />
                <Input
                    value={dataCymbal.categorie}
                    disabled
                />
            </Group>
            <Grid >
                <Grid.Col span={8}>
                    <Input
                        placeholder="Nombre producto"
                        value={name}
                        onChange={(event) => setName(event.currentTarget.value)}

                    />
                </Grid.Col>
                <Grid.Col span={4}>
                    <Input
                        placeholder="Precio"
                        value={price}
                        onChange={(event) => setPrice(event.currentTarget.value)}
                    />
                </Grid.Col>
            </Grid>
            <Textarea placeholder="Descripción"
                value={description}
                onChange={(event) => setDescription(event.currentTarget.value)} />

            {showErrorMessage ? (<Alert icon={<IconAlertCircle size={16} />} title="Faltan datos" color="red" radius="md" variant="outline">
                Todos los campos deben ser llenados (Descripción es opcional)
            </Alert>) : null}
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
                            backgroundColor: '#47A025',
                            '&:hover': {
                                backgroundColor: theme.fn.darken('#47A025', 0.05),
                            },
                        },
                    })}
                    onClick={() => handleEditProduct()}>Guardar cambios</Button>
            </Flex>
        </FormBaseModal>

    );
}
