import { deleteDoc, doc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from "../../config/firebase";
import { getFirst3Letter, getFirstLetterEachWord } from '../../static/onStrings';

interface ProductProps {
    id: string
    menu: string
    categorie: string
    name: string
    description: string
    price: number
}


export const addProductDoc = async ({ id, menu, categorie, description, name, price }: ProductProps) => {
    return await setDoc(doc(db, 'cymbals', id), {
        menu: menu,
        categorie: categorie,
        name: name,
        description: description,
        price: price,
        status: 'active'
    })
}

export const editProductDoc = async ({ id, description, name, price }: ProductProps) => {
    return await updateDoc(doc(db, 'cymbals', id), {
        name: name,
        description: description,
        price: price,
        status: 'active'
    })
}

export const deleteProductDoc = async (id: any) => {
    return await deleteDoc(doc(db, 'cymbals', id))
}

export const turnOnOffProduct = async (id: any, status: any) => {
    const currenStatus = status === 'active' ? 'inactive' : 'active'
    return await updateDoc(doc(db, 'cymbals', id), {
        status: currenStatus
    })
}

// export const addAll = async () => {
//     const url = 'https://almatierra-7796b-default-rtdb.firebaseio.com/dataCymbals.json'
//     const r = await fetch(url)
//     let json = await r.json()
//     let cymbals = json.filter((e: any) => e !== null)
//     cymbals.map((d: any, i: number) => {
//         const formatNumber = i < 10 ? '000' + i : i < 100 ? '00' + i : i < 1000 ? '0' + i : i
//         const currentId = getFirst3Letter(d.menu) + getFirstLetterEachWord(d.categorie) + formatNumber
//         console.log(currentId)
//         addProduct({
//             id: currentId,
//             menu: d.menu,
//             categorie: d.categorie,
//             description: d.description,
//             name: d.name,
//             price: d.price
//         })
//     })
// }