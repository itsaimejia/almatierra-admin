import { Button, Flex, Group, NumberInput, Pagination, Title } from '@mantine/core'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import { CymbalsTable } from '../components/CymbalsTable'
import { Layout } from '../components/Layout'
import { LayoutBody } from '../components/LayoutBody'
import styles from '../styles/Home.module.css'
import { dataCymbals } from '../utils/data';


export default function Home() {
  // const [currentPage, setCurrentPage] = useState(1)
  // const [dataPerPage, setDataPerPage] = useState(10)

  // const indexOfLastDatum = currentPage * dataPerPage
  // const indexOfFirstDatum = indexOfLastDatum - dataPerPage
  // const currentData = dataCymbals.slice(indexOfFirstDatum, indexOfLastDatum)
  // const totalPagination = Math.round(dataCymbals.length / dataPerPage)

  return (<Layout>
    <LayoutBody titlePage={'Menú'}>
      <Group position='apart'>
        <Flex
          gap="xs"
          justify="flex-start"
          align="flex-start"
          direction="row"
          wrap="nowrap"
        >
          <Button>Nuevo producto</Button>
          <Button>Buscar por nombre</Button>
          <Button>Buscar por menu</Button>
        </Flex>
        <Button>Editar menus</Button>
      </Group>
      {/* <NumberInput sx={{ width: 100 }}
        value={dataPerPage}
        stepHoldDelay={500}
        stepHoldInterval={100}
        onChange={(val: any) => setDataPerPage(val)}
      /> */}
      <CymbalsTable dataTable={dataCymbals} />
      {/* <Pagination page={currentPage} onChange={setCurrentPage} total={totalPagination} /> */}
    </LayoutBody>
  </Layout>
  )
}
