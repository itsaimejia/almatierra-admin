import { Group, Flex, Button, TextInput, ScrollArea } from '@mantine/core'
import { IconEdit, IconPlus, IconSearch, IconSettings } from '@tabler/icons';
import { getDocs, collection } from 'firebase/firestore'
import { useState } from 'react'
import { sortData } from '../classes/Products'
import { AdminMenusModal } from '../components/AdminMenusModal'
import { Layout } from '../components/Layout'
import { LayoutBody } from '../components/LayoutBody'
import { NewProductModal } from '../components/NewProductModal'
import { TableSortCymbals } from '../components/TableSortCymbals'
import { db } from '../config/firebase'

interface HomeProps {
  dataCymbals?: any
}
export default function Home({ dataCymbals }: HomeProps) {
  const [search, setSearch] = useState('');
  const [sortedData, setSortedData] = useState(dataCymbals);
  const [currentDataCymbals, setCurrentDataCymbals] = useState(dataCymbals)
  const [openedNewProductModal, setOpenedNewProductModal] = useState(false)
  const [openedAdminMenusModal, setOpenedAdminMenusModal] = useState(false)
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setSortedData(sortData(currentDataCymbals, { search: value }));
  }

  async function reloadDataCymbals() {
    const querySnapshot = await getDocs(collection(db, "cymbals"))
    let cymbals: any = []
    querySnapshot.forEach((doc) => {
      const newObject = {
        id: doc.id,
        menu: doc.data().menu,
        categorie: doc.data().categorie,
        name: doc.data().name,
        description: doc.data().description,
        price: doc.data().price,
        status: doc.data().status
      }
      cymbals.push(newObject)
    })
    const sortCymbals = cymbals.sort((a: any, b: any) => parseInt(b.id.slice(-4)) - parseInt(a.id.slice(-4)))
    setSortedData(sortData(sortCymbals, { search }))
    setCurrentDataCymbals(sortCymbals)
  }

  return (<Layout>
    <LayoutBody titlePage={'Menú'}>
      <NewProductModal opened={openedNewProductModal} setOpened={setOpenedNewProductModal} dataCymbals={currentDataCymbals} reloadData={reloadDataCymbals} />
      <AdminMenusModal opened={openedAdminMenusModal} setOpened={setOpenedAdminMenusModal} />
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
          <TextInput
            sx={{ width: 300 }}
            placeholder="Buscar por ID, Nombre, Menú, Categoría"
            mb="md"
            icon={<IconSearch size={14} stroke={1.5} />}
            value={search}
            onChange={handleSearchChange}
          />
        </Flex>
        {/* <Button
          disabled
          styles={(theme) => ({
            root: {
              backgroundColor: '#47A025',
              color: 'black',
              '&:hover': {
                backgroundColor: theme.fn.darken('#47A025', 0.05),
              },
            },
          })} leftIcon={<IconSettings />} onClick={() => setOpenedAdminMenusModal(true)} >Editar menus</Button> */}
      </Group>
      <TableSortCymbals data={sortedData} reloadDataCymbals={reloadDataCymbals} />

    </LayoutBody>
  </Layout>
  )
}

export async function getStaticProps() {
  const querySnapshot = await getDocs(collection(db, "cymbals"))
  let cymbals: any = []
  querySnapshot.forEach((doc) => {
    const newObject = {
      id: doc.id,
      menu: doc.data().menu,
      categorie: doc.data().categorie,
      name: doc.data().name,
      description: doc.data().description,
      price: doc.data().price,
      status: doc.data().status
    }
    cymbals.push(newObject)
  })
  const sortCymbals = cymbals.sort((a: any, b: any) => parseInt(b.id.slice(-4)) - parseInt(a.id.slice(-4)))
  return { props: { dataCymbals: sortCymbals } }
}
