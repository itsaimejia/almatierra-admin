import { Button, Flex, Group } from '@mantine/core'
import { IconPlus } from '@tabler/icons'
import { useEffect, useState } from 'react'
import { CymbalsTable } from '../components/CymbalsTable'
import { Layout } from '../components/Layout'
import { LayoutBody } from '../components/LayoutBody'
import { NewProductModal } from '../components/NewProductModal'
import { getFirstLetterEachWord } from '../static/onStrings';




export default function Home() {
  // const [currentPage, setCurrentPage] = useState(1)
  // const [dataPerPage, setDataPerPage] = useState(10)

  // const indexOfLastDatum = currentPage * dataPerPage
  // const indexOfFirstDatum = indexOfLastDatum - dataPerPage
  // const currentData = dataCymbals.slice(indexOfFirstDatum, indexOfLastDatum)
  // const totalPagination = Math.round(dataCymbals.length / dataPerPage)
  const [openedNewProductModal, setOpenedNewProductModal] = useState(false)
  const [dataCymbals, setDataCymbals] = useState([])

  useEffect(() => {
    const fetchCymbals = async () => {
      const res = await fetch(`/api/cymbals`)
      const data = await res.json()
      setDataCymbals(data ?? [])
    }
    fetchCymbals()
  }, [])

  return (<Layout>
    <LayoutBody titlePage={'Menú'}>
      <NewProductModal opened={openedNewProductModal} setOpened={setOpenedNewProductModal} dataCymbals={dataCymbals} />
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
          <Button >Buscar por nombre</Button>
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
