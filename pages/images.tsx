import { Box, Button, Flex, Grid, Group, NativeSelect, Stack } from '@mantine/core'
import React from 'react'
import { Layout } from '../components/Layout'
import { LayoutBody } from '../components/LayoutBody'

export default function Images() {
    return (
        <Layout>
            <LayoutBody titlePage='Imagenes'>
                <Button sx={{ width: 200 }}>Seleccionar archivo</Button>
                <Flex
                    mih={50}
                    bg="white"
                    gap="xs"
                    justify="flex-start"
                    align="flex-start"
                    direction="row"
                    wrap="nowrap"
                >
                    <Box sx={{ backgroundColor: 'grey', height: 650, width: '80%' }}>
                    </Box>
                    <Stack sx={{ backgroundColor: 'white', height: 650, padding: 10, width: '20%' }}>
                        <NativeSelect
                            sx={{}}
                            data={['React', 'Vue', 'Angular', 'Svelte']}
                        />
                    </Stack>
                </Flex>
                <Flex justify="center" align="center">
                    <Button sx={{ width: 250, alignContent: 'center' }}>Subir imagen</Button>
                </Flex>
            </LayoutBody>
        </Layout>
    )
}

