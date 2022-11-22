import { ActionIcon, Alert, Box, Button, Flex, Grid, Group, Input, Modal, NativeSelect, Select, Stack, Text, Textarea, Notification } from '@mantine/core'
import { IconAlertCircle, IconCheck, IconX } from '@tabler/icons'
import React, { useEffect, useState } from 'react'
import { getFirst3Letter, getFirstLetterEachWord, isNotEmpty, normilizeWord } from '../static/onStrings'
import { addProduct } from '../pages/api/cymbals';
import { FormBaseModal } from './FormBaseModal';


interface NewProductModalProps {
    opened: boolean
    setOpened: any
    dataCymbals: Array<any>
}
export const NewProductModal = ({ opened, setOpened, dataCymbals }: NewProductModalProps) => {
    const [dataMenus, setDataMenus] = useState([])
    const [titlesMenus, setTitleMenus] = useState([])
    const [dataCategories, setDataCategories] = useState([])
    const [selectTitleMenu, setSelectTitleMenu] = useState('')
    const [selectCategorie, setSelectCategorie] = useState('')
    const [disabledCategories, setDisabledCategories] = useState(true)
    const [showErrorMessage, setShowErrorMessage] = useState(false)
    const [showNotification, setShowNotification] = useState(false)
    const [loading, setLoading] = useState(false)

    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')

    useEffect(() => {
        const fetchMenus = async () => {
            const res = await fetch(`/api/menus`)
            const data = await res.json()
            const titleMenusList = data.map((d: any) => d.title)
            setDataMenus(data ?? [])
            setTitleMenus(titleMenusList)
        }
        fetchMenus()
    }, [])
    const fillCategories = (title: string) => {
        dataMenus.map((d: any) => {
            if (normilizeWord(d.title) === normilizeWord(title))
                setDataCategories(d.categories)
        })
        setDisabledCategories(false)
    }

    const closeModal = () => {
        setOpened(false)
        setSelectTitleMenu('')
        setSelectCategorie('')
        setName('')
        setPrice('')
        setDescription('')
        setDisabledCategories(true)
        setShowErrorMessage(false)
    }

    const handleNewProduct = async () => {
        const valid = isNotEmpty(selectTitleMenu) && isNotEmpty(selectCategorie)
            && isNotEmpty(name) && isNotEmpty(price)
        setShowErrorMessage(!valid)
        if (valid) {
            setShowNotification(true)
            setLoading(true)
            let lastIdNumber: any = dataCymbals.map((d: any) => parseInt(d.id.slice(-4))).sort((a, b) => a - b).at(-1)
            const idNumber = parseInt(lastIdNumber) + 1
            const formatNumber = (n: any) => n < 10 ? '000' + n : n < 100 ? '00' + n : n < 1000 ? '0' + n : n
            const currentId = getFirst3Letter(selectTitleMenu) + getFirstLetterEachWord(selectCategorie) + formatNumber(idNumber)
            addProduct({
                id: currentId,
                menu: selectTitleMenu,
                categorie: selectCategorie,
                description: description,
                name: name,
                price: price
            }).then((v) => {
                setLoading(false)
                setTimeout(() => setShowNotification(false), 5000)
                closeModal()
            })

        }
    }
    return (
        <FormBaseModal title={'Agregar nuevo producto'} opened={opened} closeModal={closeModal} >
            <Group grow>
                <Select
                    placeholder='Menú'
                    value={selectTitleMenu}
                    onChange={(value: any) => {
                        setSelectTitleMenu(value)
                        setSelectCategorie('')
                        fillCategories(value)
                    }}
                    data={titlesMenus}
                />
                <Select
                    placeholder='Categoría'
                    value={selectCategorie}
                    onChange={(value: any) => setSelectCategorie(value)}
                    data={dataCategories}
                    disabled={disabledCategories}
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
                {loading ? 'Guardando registro' : 'Registro guardado'}
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
                    onClick={() => handleNewProduct()}>Guardar</Button>
            </Flex>
        </FormBaseModal>

    );
}
