import { getDocs, collection } from 'firebase/firestore'
import { useState } from 'react'
import { Layout } from '../components/Layout'
import { LayoutBody } from '../components/LayoutBody'
import { TableSortCymbals } from '../components/TableSortCymbals'
import { db } from '../config/firebase'

export default function Home({ dataCymbals }: { dataCymbals: any }) {
  return (<Layout>
    <LayoutBody titlePage={'Menú'}>
      <TableSortCymbals data={dataCymbals} />
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
