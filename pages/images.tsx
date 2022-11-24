import { Alert, BackgroundImage, Box, Button, Center, ColorPicker, Container, Flex, Grid, Group, NativeSelect, Select, Stack, Notification } from '@mantine/core'
import { useEffect, useRef, useState } from 'react';
import React from 'react'
import { Layout } from '../components/Layout'
import { LayoutBody } from '../components/LayoutBody'
import { Text, Image, SimpleGrid } from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE, FileWithPath } from '@mantine/dropzone';
import { _BackgroundImage } from '@mantine/core/lib/BackgroundImage/BackgroundImage';
import { IconAlertCircle, IconCheck, IconPlus, IconUpload } from '@tabler/icons';
import { normilizeWord, isNotEmpty, normilizeIdmage } from '../static/onStrings';
import { uploadImage, addImageDoc } from './api/images';
import { showNotification, updateNotification } from '@mantine/notifications';
import { useRouter } from 'next/router';



const notificationUploadStart = () =>
    showNotification({
        id: 'uploadimg',
        loading: true,
        title: 'Cargando imagen',
        message: 'Se te indicara al finalizar la carga',
        autoClose: false,
        disallowClose: true,
    })

const notificationUploadComplete = () =>
    updateNotification({
        id: 'uploadimg',
        color: 'teal',
        title: 'Imagen cargada correctamente',
        message: 'La imagen se cargo satifactoriamente \nPuedes cerrar esta alerta o desaparecerá en 2 segundos',
        icon: <IconCheck color='red' size={16} />,
        autoClose: 1500,
    })

const notificationUploadError = (error: string) =>
    updateNotification({
        id: 'uploadimg',
        color: 'red',
        title: 'Ocurrió un error',
        message: error,
        icon: <IconAlertCircle size={16} />,
        autoClose: 1500,
    })

export default function Images() {
    const [files, setFiles] = useState<FileWithPath[]>([]);
    const [dataMenus, setDataMenus] = useState([])
    const [titlesMenus, setTitleMenus] = useState([])
    const [selectTitleMenu, setSelectTitleMenu] = useState('')
    const [dataCategories, setDataCategories] = useState([])
    const [selectSection, setSelectSection] = useState('')
    const [selectCategorie, setSelectCategorie] = useState('')
    const [bgColor, setBgColor] = useState('#484646')
    const [showErrorMessage, setShowErrorMessage] = useState(false)
    const [disabled, setDisabled] = useState(false)
    const [previews, setPreviews] = useState<JSX.Element[]>([])

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
    }

    const getPreviewImg = (f: any) => {
        const preview = f.map((file: any, index: number) => {
            const imageUrl = URL.createObjectURL(file);
            return (
                <Image
                    alt=''
                    key={index}
                    src={imageUrl}
                    height={600}
                    imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }}
                />
            )
        })
        setPreviews(preview)
    }

    console.log(previews)
    const clearSelection = () => {
        setSelectTitleMenu('')
        setSelectCategorie('')
        setSelectSection('')
    }
    const handleUpload = async () => {
        const fileImage = files[0]
        if (fileImage != undefined) {
            setDisabled(true)
            if (selectSection === 'Banner') {
                notificationUploadStart()
                await uploadImage(fileImage)
                    .then(async (r: any) => {
                        const { metadata } = r
                        const { bucket, fullPath, md5Hash } = metadata
                        const url = `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${fullPath}`
                        const res = await fetch(url)
                        let imageData = await res.json()
                        const { downloadTokens } = imageData
                        const urlImage = `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${fullPath}?alt=media&token=${downloadTokens}`
                        await addImageDoc({
                            id: normilizeIdmage(md5Hash),
                            alt: fullPath,
                            categorie: '-',
                            menu: '-',
                            section: normilizeWord(selectSection),
                            src: urlImage
                        }).then(() => {
                            clearSelection()
                            setPreviews([])
                            notificationUploadComplete()
                        }).catch((e) => {
                            notificationUploadError(e)
                        })
                    }).catch((e) => {
                        notificationUploadError(e)
                    })

            } else if (selectSection === 'Menú') {
                const valid = isNotEmpty(selectTitleMenu) && isNotEmpty(selectCategorie)
                setShowErrorMessage(!valid)
                if (valid) {
                    notificationUploadStart()
                    await uploadImage(fileImage)
                        .then(async (r: any) => {
                            const { metadata } = r
                            const { bucket, fullPath } = metadata
                            const url = `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${fullPath}`
                            const res = await fetch(url)
                            let imageData = await res.json()
                            const { md5Hash, downloadTokens } = imageData
                            const urlImage = `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${fullPath}?alt=media&token=${downloadTokens}`
                            await addImageDoc({
                                id: normilizeIdmage(md5Hash),
                                alt: fullPath,
                                categorie: selectCategorie,
                                menu: normilizeWord(selectTitleMenu),
                                section: normilizeWord(selectSection),
                                src: urlImage
                            }).then(() => {
                                clearSelection()
                                setPreviews([])
                                notificationUploadComplete()
                            }).catch((e) => {
                                notificationUploadError(e)
                            })
                        }).catch((e) => {
                            notificationUploadError(e)
                        })
                }
            } else {
                setShowErrorMessage(true)
            }
            setDisabled(false)
        }

    }
    return (
        <Layout>
            <LayoutBody titlePage='Imagenes'>
                <Dropzone
                    accept={IMAGE_MIME_TYPE} onDrop={(d: any) => {
                        setFiles(d)
                        getPreviewImg(d)
                        clearSelection()
                    }}
                    disabled={disabled}
                    sx={(theme) => ({
                        height: 40,
                        width: 210,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        border: 0,
                        backgroundColor: '#6096BA',
                        '&:hover': {
                            backgroundColor: theme.fn.darken('#6096BA', 0.05),
                        },
                    })}
                >
                    <Group >
                        <IconPlus />
                        <Text >Seleccionar imagen</Text>
                    </Group>
                </Dropzone>
                <Flex
                    mih={50}
                    bg={bgColor}
                    gap="xs"
                    justify="flex-start"
                    align="flex-start"
                    direction="row"
                    wrap="nowrap"
                >
                    <Box sx={{ backgroundColor: bgColor, width: '80%', objectFit: 'contain' }}>
                        <Center>
                            <SimpleGrid
                                cols={1}
                                breakpoints={[{ maxWidth: 'sm', cols: 1 }]}
                                mt={previews.length > 0 ? 'xl' : 0}
                            >
                                {previews}
                            </SimpleGrid>
                        </Center>
                    </Box>

                    <Stack sx={{ backgroundColor: 'white', minHeight: 650, padding: 10, width: '20%' }}>
                        <Select
                            disabled={disabled}
                            placeholder='Sección'
                            value={selectSection}
                            onChange={(value: any) => {
                                setSelectSection(value)
                                setBgColor('#484646')
                                setShowErrorMessage(false)
                            }}
                            data={['Banner', 'Menú']}
                        />
                        {selectSection == 'Menú' ? (<>
                            <Select
                                disabled={disabled}
                                placeholder='Menú'
                                value={selectTitleMenu}
                                onChange={(value: any) => {
                                    setSelectTitleMenu(value)
                                    setSelectCategorie('')
                                    fillCategories(value)
                                    setShowErrorMessage(false)
                                }}
                                data={titlesMenus}
                            />
                            <Select
                                placeholder='Categoría'
                                value={selectCategorie}
                                onChange={(value: any) => {
                                    setSelectCategorie(value)
                                    setShowErrorMessage(false)
                                }}
                                data={dataCategories}
                                disabled={disabled}
                            /></>) : selectSection === 'Banner' ? (<ColorPicker format='hex' value={bgColor} onChange={setBgColor} />) : null}
                        {showErrorMessage ? (<Alert icon={<IconAlertCircle size={16} />} title="Faltan datos" color="red" radius="md" variant="outline">
                            Falta seleccionar algún campo
                        </Alert>) : null}
                    </Stack>

                </Flex>
                <Flex
                    justify="center"
                    align="center"
                >
                    <Button
                        disabled={disabled}
                        sx={(theme) => ({
                            width: 250,
                            color: 'black',
                            alignContent: 'center',
                            backgroundColor: '#47A025',
                            '&:hover': {
                                backgroundColor: theme.fn.darken('#47A025', 0.05),
                            },
                        })} leftIcon={<IconUpload />}
                        onClick={() => handleUpload()}>Subir imagen</Button>
                </Flex>
            </LayoutBody>
        </Layout>
    )
}

