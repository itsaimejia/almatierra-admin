import { Group, Input, MultiSelect, Stack, Text, Badge, Box, SimpleGrid, ActionIcon, Flex, Tooltip, Grid, TextInput, Button } from '@mantine/core';
import { IconPlus, IconUpload } from '@tabler/icons';
import React, { useState } from 'react'
import { isNotEmpty, capitalizedEachWord } from '../static/onStrings';

export const NewMenuForm = () => {
    const [name, setName] = useState('')
    const [categories, setCategories] = useState('')

    const noEmptyCategories = categories.split(',').map((c: any) => capitalizedEachWord(c)).filter((a: any) => isNotEmpty(a.trim()))
    console.log(noEmptyCategories)
    return (
        <Stack>
            <Grid >
                <Grid.Col span={7}>
                    <Stack>
                        <TextInput
                            label='Nombre menú'
                            placeholder="Nombre menú"
                            description="Un único nombre de Menú (Ej: Comida, Bebidas,... etc.)"
                            value={name}
                            onChange={(event: any) => {
                                if (!(/^([a-zA-ZÀ-ÿ\u00f1\u00d1]+){1}$/g.test(event.currentTarget.value)))
                                    setName(event.currentTarget.value.substring(0, event.currentTarget.value.length - 1))
                                else
                                    setName(capitalizedEachWord(event.currentTarget.value))
                            }}
                        />
                        <TextInput
                            label="Agregar categorias"
                            placeholder="Agregar categorias"
                            description='Separa las categorias con una coma "," máximo 10 categorias'
                            value={categories}
                            onChange={(event: any) => {
                                if (!(/^[a-zA-ZÀ-ÿ\u00f1\u00d1,\s]+$/g.test(event.currentTarget.value))) {
                                    setCategories(event.currentTarget.value.substring(0, event.currentTarget.value.length - 1))
                                } else if (noEmptyCategories.length >= 10) {
                                    setCategories(event.currentTarget.value.substring(0, event.currentTarget.value.length - 1))
                                } else {
                                    setCategories(event.currentTarget.value)
                                }
                            }}
                        />

                    </Stack>
                </Grid.Col>
                <Grid.Col span={5}>
                    <Stack>
                        <Text fw={500}>Categorias: </Text>
                        <Group spacing="xs">
                            {noEmptyCategories.map((c: any, i: number) =>
                                <Text key={i} sx={{ backgroundColor: '#6096BA', padding: 5, borderRadius: 10, color: 'white' }} fz="xs">{c}</Text>)}
                        </Group>
                    </Stack>
                </Grid.Col>
            </Grid>
            <Flex
                justify="center"
                align="center"
            >
                <Button
                    size="xs"
                    sx={(theme) => ({
                        alignContent: 'center',
                        backgroundColor: '#47A025',
                        '&:hover': {
                            backgroundColor: theme.fn.darken('#47A025', 0.05),
                        },
                    })}
                >Guardar menú</Button>
            </Flex>
        </Stack>


    )
}


