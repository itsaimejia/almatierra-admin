import { Button, Flex, Paper, Table } from '@mantine/core';
import { IconUser, IconEdit, IconTrash, IconPower } from '@tabler/icons'
import React from 'react'
import { dataCymbals } from '../utils/data';
import { useState } from 'react';

export const CymbalsTable = ({ dataTable }: { dataTable: Array<any> }) => {

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
    );



    const rows = dataTable.map((data, i) => (
        <tr key={i}>
            <td>{i + 1}</td>
            <td>{data.name}</td>
            <td>{data.menu}</td>
            <td>{data.categorie}</td>
            <td>{data.description}</td>
            <td>{data.price}</td>
            <td>active</td>
            <td>
                <Flex
                    gap="md"
                    justify="center"
                    align="center"
                    direction="row">
                    <IconEdit size={19} />
                    <IconTrash size={19} />
                    <IconPower size={19} />
                </Flex>
            </td>
        </tr>
    ));

    return (
        <Paper shadow="lg" p="xs">
            <Table sx={{ backgroundColor: 'white', }} captionSide="bottom" striped withColumnBorders>
                <thead>{ths}</thead>
                <tbody>{rows}</tbody>
                <tfoot>{ths}</tfoot>
            </Table>
        </Paper>
    );

}
