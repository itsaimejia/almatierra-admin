import { BackgroundImage, Box, Button, Center, ColorPicker, Container, Flex, Grid, Group, NativeSelect, Select, Stack } from '@mantine/core'
import { useEffect, useRef, useState } from 'react';
import React from 'react'
import { Layout } from '../components/Layout'
import { LayoutBody } from '../components/LayoutBody'
import { Text, Image, SimpleGrid } from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE, FileWithPath } from '@mantine/dropzone';
import { _BackgroundImage } from '@mantine/core/lib/BackgroundImage/BackgroundImage';
import { IconPlus } from '@tabler/icons';
import { normilizeWord } from '../static/onStrings';

export default function Images() {
    const [files, setFiles] = useState<FileWithPath[]>([]);
    const [dataMenus, setDataMenus] = useState([])
    const [titlesMenus, setTitleMenus] = useState([])
    const [selectTitleMenu, setSelectTitleMenu] = useState('')
    const [dataCategories, setDataCategories] = useState([])
    const [selectSection, setSelectSection] = useState('')
    const [disabledCategories, setDisabledCategories] = useState(true)
    const [selectCategorie, setSelectCategorie] = useState('')
    const [gbColor, setBgColor] = useState('#484646');


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

    const previews = files.map((file, index) => {
        const imageUrl = URL.createObjectURL(file);
        return (
            <Image
                alt=''
                key={index}
                src={imageUrl}
                imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }}
            />
        );
    })

    console.log(previews)
    return (
        <Layout>
            <LayoutBody titlePage='Imagenes'>
                <Dropzone
                    accept={IMAGE_MIME_TYPE} onDrop={setFiles}
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
                    bg="grey"
                    gap="xs"
                    justify="flex-start"
                    align="flex-start"
                    direction="row"
                    wrap="nowrap"
                >
                    <Box sx={{ backgroundColor: 'grey', width: '80%', objectFit: 'contain' }}>
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

                    <Stack sx={{ backgroundColor: 'white', height: '100%', padding: 10, width: '20%' }}>
                        <Select
                            placeholder='Sección'
                            value={selectSection}
                            onChange={(value: any) => {
                                setSelectSection(value)
                            }}
                            data={['Banner', 'Menú']}
                        />
                        {selectSection == 'Menú' ? (<>
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
                            /></>) : selectSection === 'Banner' ? (<ColorPicker format='hex' value={gbColor} onChange={setBgColor} />) : null}
                    </Stack>

                </Flex>
                <Flex
                    justify="center"
                    align="center"
                >
                    <Button sx={{ width: 250, alignContent: 'center' }}>Subir imagen</Button>
                </Flex>

            </LayoutBody>
        </Layout>
    )
}

